import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';
import { CountryService } from '../../Services/country.service';
import { Country } from '../../Modules/country';

@Component({
  selector: 'app-solution5',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, ReactiveFormsModule,
            Ng2SearchPipeModule],
    template: `
     <h2>{{ title }}</h2>

     <div class="container">
        <div class="row">
          <form [formGroup]="filterForm">
              <input 
                formControlName="searchFilter"     
                class="form-control" 
                type="text" 
                name="search" 
                autocomplete="on" 
                placeholder="{{ title }}" />
          </form>

          <ul>
            @for(country of countries$ | async | filter:searchFilter; track country){
              <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
              <div class="d-flex align-items-center ms-3">
                <i class="fas fa-search me-2"></i>
                <p class="country-name mb-0">{{ country.name.official }}</p>
              </div>
            }
          </ul>
        </div>
    </div>
     `,
    styles: ``
})
export class Solution5Component implements OnInit {
  title = '5- Pipe + Ng2SearchPipeModule dependency  + Reactive form (formControlName)';
  searchFilter: string = '';
  countryService = inject(CountryService);
  
  searchText: any;
  // TODO: move to the same API endpoint as in the previous example
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
  countries$: Observable<Country[]> = of([]);
  searchSubject: any;

  filterFormSubscription?: Subscription = new Subscription(); 

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('')
});

  ngOnInit() {
    this.filterFormSubscription = this.filterForm.get('searchFilter')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap(countries => of(countries))
        );
      })
    ).subscribe((filteredData) => {
      this.countries$ = of(filteredData);
    });
  }
}
