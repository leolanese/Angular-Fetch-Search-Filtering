import { Component, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Observable, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../Modules/country';

@Component({
  selector: 'app-solution3',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
   <h2>{{ title }}</h2> 
   <div class="container">
      <input 
        [formControl]="filter" 
        type="text"
        class="form-control"
        autocomplete="on" 
        placeholder="Search using RxJS and Reactive Forms" />
     
      <ul *ngFor="let country of countries$ | async">
        <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
        <div class="d-flex align-items-center ms-3">
          <i class="fas fa-search me-2"></i>
          <p class="country-name mb-0">{{ country.name.official }}</p>
        </div>
      </ul>  
   </div>
  `
})

export class Solution3Component {
  title = '3- Data filter using RxJs operators and Angular Reactive forms'

  filter!: FormControl;
  countries$: Observable<Country[]> = of([]);

  searchFilter$!: Observable<string>;

  countryService = inject(CountryService);

  ngOnInit() {
    this.filter = new FormControl('');
    this.searchFilter$ = this.filter.valueChanges.pipe(startWith(''));

    this.countries$ = this.searchFilter$.pipe(
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
