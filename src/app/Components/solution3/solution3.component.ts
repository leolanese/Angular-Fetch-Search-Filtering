import { Component, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, startWith, switchMap, takeUntil } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../Modules/country';
import { FilterPipe } from '../../Pipes/filter.pipe';

@Component({
  selector: 'app-solution3',
  standalone: true,
  imports: [CommonModule, 
            FilterPipe,
            FormsModule, ReactiveFormsModule],
  template: `
   <h2>{{ title }}</h2> 
   <div class="container">
   <form [formGroup]="filterForm">
      <input 
        [formControl]="searchFilterFormControl" 
        formControlName="searchFilter" 
        type="text"
        class="form-control"
        autocomplete="on" 
        placeholder="{{ title }}" />
  </form>
     
      <ul *ngFor="let country of countries$ | async | filter:filterForm.get('searchFilter')?.value">
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
  title = '3- Angular Reactive forms (formGroup, formControl, formControlName) + .get()'

  searchFilterFormControl: FormControl = new FormControl('');
  searchFilter$!: Observable<string>;

  countries$: Observable<Country[]> = of([]);
  private destroy$ = new Subject<void>();
  
  countryService = inject(CountryService);

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('')
});

  ngOnInit() {
    this.searchFilter$ = this.searchFilterFormControl.valueChanges.pipe(startWith(''));

    this.countries$ = this.searchFilter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm).pipe(
        takeUntil(this.destroy$)
      ))
    )
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit a value to signal completion
    this.destroy$.complete();
  }
}
