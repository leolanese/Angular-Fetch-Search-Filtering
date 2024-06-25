import { Component, computed, DestroyRef, effect, inject, input, OnInit, signal, Signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-solution7',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>
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
            @for(country of countries$ | async | filter: countrySearchNameSignal() ; track country.idd){
              <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
              <div class="d-flex align-items-center ms-3">
                <i class="fas fa-search me-2"></i>
                <p class="country-name mb-0">{{ country.name.official }}</p>
              </div>
            }
          </ul> 
      </form>
    </div>
  `,
    imports: [CommonModule,
              ReactiveFormsModule,
              FilterPipe]
})
export class Solution7Component implements OnInit {
  title = '7- Pipe + Signal (based on stable values & optimise for efficient rendering) + Angular Reactive forms: formGroup, formControlName + takeUntilDestroyed';
  countries$: Observable<Country[]> = of([]);
  searchFilter: string = '';

  private countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef)

  searchFilter$!: Observable<string> 

  filterForm: FormGroup;

  countrySearchNameSignal: Signal<any>;

   constructor() {
    this.filterForm = new FormGroup({
      inputSearch: new FormControl('')
    });
  
    this.countrySearchNameSignal = toSignal(
      this.filterForm.get('inputSearch')?.valueChanges.pipe(debounceTime(300)) 
        ?? of(null),
      {}
    );

  }

  ngOnInit() {
    this.searchFilter$ =  this.filterForm.get('inputSearch')?.valueChanges.pipe(startWith('')) || of('');
   
    this.countries$ = this.searchFilter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm)),
      takeUntilDestroyed(this.destroyRef)
    )
  }

}
