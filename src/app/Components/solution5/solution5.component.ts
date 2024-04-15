import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, map } from 'rxjs';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-solution5',
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule, 
            ReactiveFormsModule,
            MatInputModule, Ng2SearchPipeModule],
    template: `
     <h2>{{ title }}</h2>

     <div class="container">
      <div class="row">
        <div class="search-hero">
          <input 
            [(ngModel)]="searchText" 
            class="form-control" 
            type="text" 
            name="search" 
            autocomplete="on" 
            placeholder="{{ title }}" />
        </div>
          <ul>
            @for(hero of heroes | filter: searchText; track hero){
              <li>{{hero.name}}</li>
            }
          </ul>
      </div>
    </div>
     `,
    styles: ``
})
export class Solution5Component {
  title = '5- Pipe + Ng2SearchPipeModule dependency  + 2-way-binding[()]';

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
  
}
