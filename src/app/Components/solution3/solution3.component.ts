import { Component, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface State {
  abbreviation: string;
  name: string;
}

export const states = [
  {
      "name": "Alabama",
      "abbreviation": "AL"
  },
  {
      "name": "Nebraska",
      "abbreviation": "NE"
  },
  {
      "name": "Nevada",
      "abbreviation": "NV"
  },
  {
      "name": "New Hampshire",
      "abbreviation": "NH"
  },
  {
      "name": "New Jersey",
      "abbreviation": "NJ"
  },
  {
      "name": "New Mexico",
      "abbreviation": "NM"
  },
  {
      "name": "New York",
      "abbreviation": "NY"
  },
  {
      "name": "Wisconsin",
      "abbreviation": "WI"
  },
  {
      "name": "Wyoming",
      "abbreviation": "WY"
  }
];

@Component({
  selector: 'app-solution3',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
   <h2>{{ title }}</h2> 
   <div class="container">
      <input 
        [formControl]="filter" 
        type="text"
        class="form-control"
        placeholder="Search using RxJS and Reactive Forms" />
     
      <ul>
        <li *ngFor="let state of filteredStates$ | async">{{ state.name }}</li>
      </ul>  
   </div>
  `
})

export class Solution3Component {
  title = 'Data filter using RxJs operators and Angular Reactive forms features'
  states$!: Observable<State[]>;
  filteredStates$!: Observable<State[]>;
  filter!: FormControl;
  filter$!: Observable<string>;

  countryService = inject(CountryService);
  http = inject(HttpClient);

  // states$: Observable<State[]> = this.countryService.getStates();
  constructor() {}

  ngOnInit() {
    this.states$ = of(states);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => state.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

  
}
