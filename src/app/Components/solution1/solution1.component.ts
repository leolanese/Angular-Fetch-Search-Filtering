import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../services/country.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-solution1',
  standalone: true,
  imports: [CommonModule, 
            FilterPipe, 
            FormsModule],
  template: `
    <h3>{{ title }}</h3>
    <div class="container">
        <input 
          [(ngModel)]="searchFilterModel" 
          (ngModelChange)="onSearch($event)"
          type="text"
          class="form-control"
          placeholder="{{ title }}" />

        <ul>
          @for(country of countries$ | async | filter:searchFilterModel; track country.idd) {
            <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
            <div class="d-flex align-items-center ms-3">
              <i class="fas fa-search me-2"></i>
              <p class="country-name mb-0">{{ country.name.official }}</p>
            </div>
          }
        </ul>
    </div>`,
})
export class Solution1Component implements OnInit {
  title = '1- Pipe + Template Driven form [(ngModel)], ngModelOnChange + 2-way-binding + takeUntilDestroyed';
  searchFilterModel = '';

  countries$: Observable<Country[]> = of([]);
  private searchSubject$ = new Subject<string>();
  
  private destroyRef = inject(DestroyRef)
  private countryService = inject(CountryService);
  
  onSearch(term: string): void {
    this.searchSubject$.next(term);
  }
  /**
   * Initialises the component and subscribes to the searchSubject$ Subject  
   * to perform a search (for countries) based on the search term entered by the user
   */
  ngOnInit(): void {
    this.countries$ = this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => 
        this.countryService.searchCountries(searchTerm)
      ),
      takeUntilDestroyed(this.destroyRef) // use takeUntilDestroyed(this.destroyRef) to automatically unsubscribe
    )
  }

}
