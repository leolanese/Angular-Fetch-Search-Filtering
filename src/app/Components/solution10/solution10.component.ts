import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, Observable, of } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { Country } from '../../Modules/country';
import { countries } from "../../services/mocks/countries";

@Component({
    selector: 'app-solution10',
    standalone: true,
    template: `
    <h3>{{ title }}</h3>
    <div class="container">   
    
      <form [formGroup]="form">
        <input 
          formControlName="filter"
          
          class="form-control" 
          type="text" 
          autocomplete="on" 
          placeholder="{{ title }}"
          aria-label="search" 
          required />

        <div *ngIf="form.controls['filter'].invalid && (form.controls['filter'].dirty || form.controls['filter'].touched)">
          <small class="text-danger" *ngIf="form.controls['filter'].errors?.['required']">
            This field is required.
          </small>
          <small class="text-danger" *ngIf="form.controls['filter'].errors?.['minlength']">
            Minimum length is 3 characters.
          </small>
        </div>

        <ul>
          <ng-container *ngFor="let country of filteredCountry$ | async">
             <li>{{ country.name }}</li>
          </ng-container>
        </ul>
      </form>
    </div>
  `,
    imports: [CommonModule,
              ReactiveFormsModule]
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
      filter: ['', [Validators.required, Validators.minLength(3)]]
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