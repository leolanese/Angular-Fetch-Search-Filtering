import { Component, computed, DestroyRef, effect, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-solution8',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>

    <div class="container">
        <form>

          <input 
              [(ngModel)]="countrySearchSignal"
              name="userName" 

              class="form-control" 
              type="text" 
              autocomplete="on" 
              placeholder="{{ title }}"
              aria-label="search" 
              required />
           
          <button (click)="onSearch()">Search</button>   
        <ul> 
          @for(country of countries$ | async | filter: countrySearchSignal(); track country.idd){
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
              FormsModule, FilterPipe]
})
export class Solution8Component {
    title = '8- Pipe + Signal + Template Driven form [(ngModel)] + onSearch event + takeUntilDestroyed';
    countries$: Observable<Country[]> = of([]);
    countrySearchSignal = signal("");

    private countryService = inject(CountryService);
    private destroyRef = inject(DestroyRef); 

    searchFilter$!: Observable<string> 

    form = viewChild.required(NgForm);

    onSearch(): void {
      const form = this.form();

      this.searchFilter$ = of(form.controls['userName'].value);
   
      this.countries$ = this.searchFilter$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm)),
        takeUntilDestroyed(this.destroyRef)
      )

      console.log("Search:", form.controls['userName'].value);
    }  


  computedValue = computed(() => {

  });

  // allowSignalWrites property to true deactivates this child safety facility
  signalLoggingEffect = effect(() => {

  }, { allowSignalWrites: true })

  initialiseSearch = effect(() => {
    // console.log(`Signal (toSignal): ${JSON.stringify(this.countrySearchNameSignal())}`);
  });

 
}
