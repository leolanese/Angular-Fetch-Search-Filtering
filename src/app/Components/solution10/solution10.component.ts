import { Component, computed, effect, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { CountryService } from '../../Services/country.service';
import { OptionComponent } from "../solution8/option.component";
import { countries } from "../../services/mocks/countries";
import { map, startWith } from "rxjs/operators";
import { combineLatest} from "rxjs";

@Component({
    selector: 'app-solution10',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>

    <div class="container">
      <form>
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
  title = '10- rxjs + ReactiveFormsModule + formControl';
  countries$: Observable<Country[]>;

  // Data describing 
  filteredCountry$: Observable<Country[]>;
  
  filter: FormControl;
  filter$: Observable<string>;

  constructor() {
    this.countries$ = of(countries) as any;

    this.filter = new FormControl("");
    this.filter$ = this.filter.valueChanges.pipe(
      startWith(""),
      distinctUntilChanged()
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