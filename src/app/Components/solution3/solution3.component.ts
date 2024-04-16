import { Component, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, startWith, switchMap, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../Modules/country';

@Component({
  selector: 'app-solution3',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, ReactiveFormsModule],
  template: `
   <h2>{{ title }}</h2> 
   <div class="container">
      <input 
        [formControl]="searchFilter" 
        type="text"
        class="form-control"
        autocomplete="on" 
        placeholder="{{ title }}" />
     
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
  title = '3- valueChanges + Angular Reactive forms (FormControl)'

  searchFilter: FormControl = new FormControl('');

  countries$: Observable<Country[]> = of([]);
  searchFilter$!: Observable<string>;
  private destroy$ = new Subject<void>();
  
  countryService = inject(CountryService);

  ngOnInit() {
    this.searchFilter$ = this.searchFilter.valueChanges.pipe(startWith(''));

    this.countries$ = this.searchFilter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap(countries => of(countries))
        );
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit a value to signal completion
    this.destroy$.complete();
  }
}
