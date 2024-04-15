import { Component, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-solution1',
  standalone: true,
  imports: [CommonModule, 
            FilterPipe, 
            FormsModule],
  template: `
    <h2>{{ title }}</h2>
    <div class="container">
        <input 
          [(ngModel)]="searchFilter" 
          (ngModelChange)="onSearch($event)"
          type="text"
          class="form-control"
          placeholder="{{ title }}" />

        <ul>
          @for(country of countries$ | async | filter:searchFilter; track country.idd) {
            <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
            <div class="d-flex align-items-center ms-3">
              <i class="fas fa-search me-2"></i>
              <p class="country-name mb-0">{{ country.name.official }}</p>
            </div>
          }
        </ul>
    </div>`
})
export class Solution1Component {
  title = '1- Pipe, template with ngModel, ngModelOnChange, 2-way-binding';
  searchFilter = '';
  countries$: Observable<Country[]> = of([]);
  private searchSubject = new Subject<string>();

  countryService = inject(CountryService);
  
  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit() {
    this.countries$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap(countries => of(countries))
        );
      })
    );
  }
}
