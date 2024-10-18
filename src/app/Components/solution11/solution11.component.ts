// Update the import to use CountryService from jsonplaceholder.service
import {CommonModule} from '@angular/common';
import {CountryService} from '../../services/jsonplaceholder.service';

import {Component,DestroyRef,inject,OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {combineLatest,Observable,of} from 'rxjs';
import {debounceTime,distinctUntilChanged,map,startWith} from 'rxjs/operators';
import {CountryListComponent} from "./List.component";
import {PaginationComponent} from "./pagination.component";

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
          placeholder="Filer Name (Patricia, Kurtis,etc)..."
        />

        <select (change)="sort($event)">
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>

        <!-- List -->
        <app-list [countries]="(filteredCountry$ | async) ?? []"></app-list>

        <!-- Pagination -->
        <app-pagination
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          (pageChange)="onPageChange($event)">
        </app-pagination>

      </form>
    </div>
  `,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, CountryListComponent]
})
export class Solution11Component implements OnInit {
  title = '10 - Search, Sort, and pagination using Array/List DS';
  countries$: Observable<any[]> = of([]);
  filteredCountry$!: Observable<any[]>;
  form: FormGroup;
  filter: FormControl;
  sortDirection: string = 'asc';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 3; 
  sortOrder: 'asc' | 'desc' = 'asc';

  private countryService = inject(CountryService)
  private fb = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)

  constructor() {
    this.form = this.fb.group({
      filter: ['']
    });
    this.filter = this.form.get('filter') as FormControl;
  }

  ngOnInit() {
    this.countries$ = this.countryService.getCountries();

    const filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(300)
    );

    this.filteredCountry$ = combineLatest([this.countries$, filter$]).pipe(
      map(([countries, filterString]) => {
        this.totalPages = Math.ceil(countries.length / this.pageSize);
        return this.applyFilterSortPagination(countries, filterString)
      }),
      takeUntilDestroyed(this.destroyRef) 
    );
    
  }

  sort(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortOrder = target.value as 'asc' | 'desc';
    this.sortOrder = sortOrder;

    this.sortDirection = sortOrder;
    this.filteredCountry$ = this.countries$.pipe(
      map(countries => this.applyFilterSortPagination(countries, this.filter.value)),
      takeUntilDestroyed(this.destroyRef)
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
    // Filtering
    let filtered = countries.filter(country =>
      country.name.toLowerCase().includes(filterString.toLowerCase())
    );

    // sorting
    filtered = filtered.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    // Pagination
    const start = this.currentPage * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  private updateFilteredData() {
    this.filteredCountry$ = this.countries$.pipe(
      map(countries => this.applyFilterSortPagination(countries, this.filter.value))
    );
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updateFilteredData();
  }
  
}
