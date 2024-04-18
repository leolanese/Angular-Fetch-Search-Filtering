import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-solution6',
  standalone: true,
  imports: [CommonModule, 
            ReactiveFormsModule, 
            FilterPipe],
  template: `
    <h2>{{ title }}</h2>
    <div class="container">

      <form [formGroup]="filterForm">
          <input 
              formControlName="inputSearch"
              class="form-control" 
              type="text" 
              name="search" 
              autocomplete="on" 
              placeholder="{{ title }}"
              aria-label="search" />

        <ul>
          @for(country of countries$ | async | filter: countryNameSignal() ; track country.idd){
            <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
            <div class="d-flex align-items-center ms-3">
              <i class="fas fa-search me-2"></i>
              <p class="country-name mb-0">{{ country.name.official }}</p>
            </div>
          }
        </ul> 

      <div *ngIf="countryNameSignal()">{{ countryNameSignal() }}</div>
    </form>
    </div>
  `,
})
export class Solution6Component {
  title = '6- Signal + Angular Reactive forms (formControlName)';
  countries$: Observable<Country[]> = of([]);
  searchFilter: string = '';

  countryService = inject(CountryService);

  searchFilter$!: Observable<string> 

  filterForm: FormGroup;

  countryNameSignal: Signal<any>;

   constructor() {
    this.filterForm = new FormGroup({
      inputSearch: new FormControl('')
    });
  
    this.countryNameSignal = toSignal(
      this.filterForm.get('inputSearch')?.valueChanges.pipe(debounceTime(300)) 
        ?? of(null),
      {}
    );
  
  }

  ngOnInit() {
    this.searchFilter$ =  this.filterForm.get('inputSearch')?.valueChanges.pipe(startWith('')) || of('');
   
    this.countries$ = this.searchFilter$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm))
    )
  }
  
}
