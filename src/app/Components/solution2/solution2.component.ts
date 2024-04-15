import { Component, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ title }}</h2>
    <div class="container">
      <form>
          <input
            #searchBox
            (input)="onSearch(searchBox.value)"
            type="text"
            class="form-control"
            autocomplete="on" 
            placeholder="Search using Subject" />

            <div class="loader" [ngClass]="{ 'show': isLoading }">
              <div class="animation-loader"></div>
            </div>

            <!-- <pre>{{ countries$ | async | json }}</pre> -->
            <ul class="list-group">
    
                @for(country of countries$ | async; track country.idd) {
                  <li class="list-group-item list-group-item-action">
                  <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
                    <div class="d-flex align-items-center ms-3">
                      <i class="fas fa-search me-2"></i>
                      <p class="country-name mb-0">{{ country.name.official }}</p>
                    </div>
                  </li>
                }
            </ul>
        
            <div class="no-results" *ngIf="(countries$ | async)?.length === 0 && !isLoading">
              <span class="material-icons">search</span> No countries found for your search.
            </div>
      </form>
  </div>`
})
export class Solution2Component {
  title = '2- Template reference variable (#), event-binding ()';
  isLoading = false;
  searchText = '';

  countryService = inject(CountryService);
  
  countries$: Observable<Country[]> = of([]);
  private searchSubject = new Subject<string>();

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit() {
    this.countries$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.isLoading = true;
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap(countries => {
            this.isLoading = false;
            return of(countries);
          })
        );
      })
    );
  }

}
