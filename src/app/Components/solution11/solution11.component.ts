// Update the import to use CountryService from jsonplaceholder.service
import {CommonModule} from '@angular/common';
import {CountryService} from '../../services/jsonplaceholder.service';

// Existing imports...
import {Component,OnInit} from '@angular/core';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {combineLatest,Observable,of} from 'rxjs';
import {debounceTime,distinctUntilChanged,map,startWith} from 'rxjs/operators';

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
          placeholder="Search..."
        />
        <select (change)="sort($event)">
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
        <ul>
          <li *ngFor="let country of filteredCountry$ | async">{{ country.name }}</li>
        </ul>
        <button (click)="previousPage()" [disabled]="currentPage <= 0">Previous</button>
        <button (click)="nextPage()">Next</button>
      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Solution11Component implements OnInit {
  title = '10 - Pagination, Sort, and Search';
  countries$: Observable<any[]> = of([]);
  filteredCountry$!: Observable<any[]>;
  form: FormGroup;
  filter: FormControl;
  sortDirection: string = 'asc';
  currentPage: number = 0;
  pageSize: number = 5;
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order

  constructor(private countryService: CountryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      filter: ['']
    });
    this.filter = this.form.get('filter') as FormControl;
  }

  ngOnInit() {
    this.countries$ = this.countryService.getCountries(); // Fetch countries

    const filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(300)
    );

    this.filteredCountry$ = combineLatest([this.countries$, filter$]).pipe(
      map(([countries, filterString]) =>
        this.applyFilterSortPagination(countries, filterString)
      )
    );
  }

  sort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortOrder = target.value as 'asc' | 'desc';
    this.sortOrder = sortOrder;

    this.sortDirection = sortOrder;
    this.filteredCountry$ = this.countries$.pipe(
      map(countries => this.applyFilterSortPagination(countries, this.filter.value))
    );
  }

  nextPage() {
    this.currentPage++;
    this.updateFilteredData();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateFilteredData();
    }
  }

  private applyFilterSortPagination(countries: any[], filterString: string) {
    let filtered = countries.filter(country =>
      country.name.toLowerCase().includes(filterString.toLowerCase())
    );

    filtered = filtered.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    const start = this.currentPage * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  private updateFilteredData() {
    this.filteredCountry$ = this.countries$.pipe(
      map(countries => this.applyFilterSortPagination(countries, this.filter.value))
    );
  }
}
