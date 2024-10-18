import {CommonModule} from '@angular/common';

import {Component,DestroyRef,inject,OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {combineLatest,Observable,of} from 'rxjs';
import {debounceTime,distinctUntilChanged,map,startWith} from 'rxjs/operators';

import {FilterInputComponent} from "./Filter-input.component";
import {ListComponent} from "./List.component";
import {PaginationComponent} from "./Pagination.component";
import {SortDropdownComponent} from "./Sort-dropdown.component";

import {SearchService} from '../../services/jsonplaceholder.service';

@Component({
  selector: 'app-solution11',
  standalone: true,
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
      <form [formGroup]="form">
        
        <!-- Filter Input -->
        <app-filter-input [filterControl]="filter"></app-filter-input>

        <!-- Sort Dropdown -->
        <app-sort-dropdown (sortChanged)="sort($event)"></app-sort-dropdown>

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
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, ListComponent, SortDropdownComponent, FilterInputComponent]
})
export class Solution11Component implements OnInit {
  title = '10 - Search, Sort, and Pagination using Array/List Data Structure';
  data$: Observable<any[]> = of([]);
  filteredCountry$!: Observable<any[]>;
  form: FormGroup;
  filter: FormControl;
  sortDirection: string = 'asc';
  currentPage = 0;
  totalPages = 0;
  pageSize = 3; 
  sortOrder: 'asc' | 'desc' = 'asc';

  private searchService = inject(SearchService)
  private fb = inject(FormBuilder)
  private destroyRef = inject(DestroyRef)

  constructor() {
    this.form = this.fb.group({
      filter: ['']
    });
    this.filter = this.form.get('filter') as FormControl;
  }

  ngOnInit() {
    this.data$ = this.searchService.getData();

    const filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(300)
    );

    this.filteredCountry$ = combineLatest([this.data$, filter$]).pipe(
      map(([countries, filterString]) => {
        this.totalPages = Math.ceil(countries.length / this.pageSize);
        return this.applyFilterSortPagination(countries, filterString)
      }),
      takeUntilDestroyed(this.destroyRef) 
    );
    
  }

  sort(sortOrder: 'asc' | 'desc'): void {
    this.sortOrder = sortOrder;

    this.sortDirection = sortOrder;
    this.filteredCountry$ = this.data$.pipe(
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
    this.filteredCountry$ = this.data$.pipe(
      map(val => this.applyFilterSortPagination(val, this.filter.value))
    );
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updateFilteredData();
  }
  
}
