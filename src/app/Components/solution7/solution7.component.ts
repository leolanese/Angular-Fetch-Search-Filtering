import { Component, computed, effect, inject, OnInit, signal, Signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-solution7',
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

      <div>{{ signalA() }}</div>
      <div>{{ signalB() }}</div>

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
})
export class Solution7Component implements OnInit {
  signalA = signal('A1');
  signalB = signal('B1');
  title = '7- Pipe + Signal (based on stable values & optimise for efficient rendering) + Angular Reactive forms: formGroup, formControlName';
  countries$: Observable<Country[]> = of([]);
  searchFilter: string = '';

  countryService = inject(CountryService);

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
  computedValue = computed(() => {
    // console.log('Compute:', this.signalA(), this.signalB()); // Logs: Compute: A4 B4
    // return this.signalA() + " " + this.signalB();

    const signalA = this.signalA();
    const signalB = this.signalB();

    return `signalA: ${signalA}, signalB: ${signalB}`;
  });

  signalLoggingEffect = effect(() => {
    console.log(`Signal A: `, this.signalA()); // Logs: Signal A:  A4
    console.log(`Signal B: `, this.signalB()); // Logs: Signal B:  B4
    console.log(`computedValue(): ${JSON.stringify(this.computedValue())} `)
  });

  initialiseSearch = effect(() => {
    console.log(`Signal (toSignal): ${JSON.stringify(this.countrySearchNameSignal())}`);
});

  ngOnInit() {
    this.searchFilter$ =  this.filterForm.get('inputSearch')?.valueChanges.pipe(startWith('')) || of('');
   
    this.countries$ = this.searchFilter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm))
    )

    this.signalA.set('A2'); // ignored
    this.signalB.set('B2'); // ignored

    this.signalA.set('A3'); // ignored
    this.signalB.set('B3'); // ignored

    this.signalA.set('A4'); // stable values
    this.signalB.set('B4'); // stable values 
  }
}
