import {CommonModule} from '@angular/common';
import {Component,DestroyRef,inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject,combineLatest,debounceTime,distinctUntilChanged,Observable} from 'rxjs';
import {map,startWith} from 'rxjs/operators';
import {CountryService} from '../../services/jsonplaceholder.service';

interface Country {
  name: string;
}

@Component({
  selector: 'app-solution11',
  standalone: true,
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
      <form [formGroup]="form">
        <input 
          [formControl]="filter" 
          class="form-control" 
          type="text" 
          autocomplete="on" 
          placeholder="{{ title }}"
          aria-label="search" 
          required 
        />
        
        <select (change)="sort($event)">
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>

        <ul>
          <ng-container *ngFor="let country of paginatedCountries$ | async">
            <li>{{ country.name }}</li>
          </ng-container>
        </ul>

        <div>
          <button (click)="previousPage()" [disabled]="currentPage.value === 1">Previous</button>
          <span>Page {{ currentPage.value }}</span>
          <button (click)="nextPage()" [disabled]="currentPage.value === totalPages">Next</button>
        </div>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Solution11Component {
  title = '11- RxJS + ReactiveFormsModule + FormGroup + FormControl';
  countries$: Observable<Country[]>;
  filteredCountries$: Observable<Country[]>;
  paginatedCountries$: Observable<Country[]>;
  
  filter: FormControl;
  form: FormGroup;

  private destroyRef = inject(DestroyRef);

  // Pagination settings
  private pageSize = 5;
  currentPage = new BehaviorSubject<number>(1);
  totalPages: number = 1;

  // Sorting
  private sortOrder = new BehaviorSubject<string>('asc');

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.form = this.fb.group({
      filter: ['']
    });

    this.filter = new FormControl('');
    const filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );

    // Fetch countries from the service
    this.countries$ = this.countryService.getCountries().pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    // Filter the data based on the search input
    this.filteredCountries$ = combineLatest([this.countries$, filter$]).pipe(
      debounceTime(500),
      map(([countries, filterString]) => 
        countries.filter(country => 
          country.name.toLowerCase().includes(filterString.toLowerCase())
        )
      ),
      map(filteredCountries => {
        this.totalPages = Math.ceil(filteredCountries.length / this.pageSize);
        return filteredCountries;
      })
    );

    // Handle sorting, pagination, and filtered data together
    this.paginatedCountries$ = combineLatest([
      this.filteredCountries$, 
      this.currentPage, 
      this.sortOrder
    ]).pipe(
      map(([countries, page, sortOrder]) => {
        // Sort the data
        const sortedCountries = [...countries].sort((a, b) => 
          sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        // Apply pagination
        const startIndex = (page - 1) * this.pageSize;
        return sortedCountries.slice(startIndex, startIndex + this.pageSize);
      })
    );
  }

  sort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortOrder = target?.value;

    if (sortOrder) {
      // Proceed with your sorting logic here
      console.log(`Sorting in ${sortOrder} order`);
    }
  }

  nextPage() {
    if (this.currentPage.value < this.totalPages) {
      this.currentPage.next(this.currentPage.value + 1);
    }
  }

  previousPage() {
    if (this.currentPage.value > 1) {
      this.currentPage.next(this.currentPage.value - 1);
    }
  }
}
