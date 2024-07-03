import { Component, computed, DestroyRef, effect, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { CountryService } from '../../services/country.service';
import { OptionComponent } from "../solution8/option.component";
import { countries } from "../../services/mocks/countries";
import { map, startWith } from "rxjs/operators";
import { combineLatest} from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-solution10',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>
    <div class="container">
    
      <form [formGroup]="form">
        <input 
          [formControl]="filter" 
          
          class="form-control" 
          type="text" 
          autocomplete="on" 
          placeholder="{{ title }}"
          aria-label="search" 
          required />

        <ul>
          <ng-container *ngFor="let country of filteredCountry$ | async">
             <li>{{ country.name }}</li>
          </ng-container>
        </ul>
      </form>
    </div>
  `,
    imports: [CommonModule,
              ReactiveFormsModule ]
})
export class Solution10Component {
  title = '10- rxjs + ReactiveFormsModule + FormGroup (optional) + formControl + takeUntilDestroyed';
  countries$: Observable<Country[]>;

  // Data describing 
  filteredCountry$: Observable<Country[]>;

  private destroyRef = inject(DestroyRef);
  
  filter: FormControl;
  filter$: Observable<string>;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      filter: ['']
    });
    this.countries$ = of(countries) as any;

    this.filter = new FormControl("");
    this.filter$ = this.filter.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    );

    this.filteredCountry$ = combineLatest(this.countries$, this.filter$).pipe(
      debounceTime(500),
      map(([countries, filterString]) =>
        countries.filter(country =>
          country.name['toLowerCase']().includes(filterString)
        )
      )
    );
  }
}