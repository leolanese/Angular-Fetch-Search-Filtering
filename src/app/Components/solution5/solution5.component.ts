import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, of, switchMap, takeUntil } from 'rxjs';
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
     <h3>{{ title }}</h3>

     <div class="container">
        <div class="row">
          <form [formGroup]="filterForm">
              <input 
                formControlName="searchFilter"     
                class="form-control" 
                type="text" 
                name="search" 
                autocomplete="on" 
                placeholder="{{ title }}"
                aria-label="search" />
          </form>

          <ul>
            @for(country of countries$ | async | filter:filterForm.get('searchFilter')?.value ; track country.idd){
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
  title = '5- Pipe Ng2SearchPipeModule + Reactive form: formGroup, formControlName';
  searchFilter: string = '';

  countryService = inject(CountryService);

  countries$: Observable<Country[]> = of([]);

  private destroy$ = new Subject<void>();

  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('')
  });

  ngOnInit() {
    this.countries$ = this.filterForm.get('searchFilter')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.countryService.searchCountries(searchTerm).pipe(
          map(countries => countries || []),
          takeUntil(this.destroy$)
        );
      })
    ) || of([]);
  }

  ngOnDestroy() {
    this.destroy$.next(); // Emit value signal completion
    this.destroy$.complete();
  }

}
