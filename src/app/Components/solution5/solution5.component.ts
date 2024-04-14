import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';

@Component({
  selector: 'app-solution5',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule, 
    ReactiveFormsModule,
    MatInputModule, Ng2SearchPipeModule],
    template: `
     <h2>{{ title }}</h2>

     <div class="container">
      <div class="row">
        <div class="search-hero">
          <input 
            class="form-control" 
            type="text" 
            name="search" 
            [(ngModel)]="searchText" 
            autocomplete="off" 
            placeholder="{{ title }}">
        </div>
          <ul>
            @for(hero of heroes | filter:searchText; track hero){
              <li>{{hero.name}}</li>
            }
          </ul>
      </div>
    </div>
     `,
    styles: [`
    .list-container {
      padding: 25px;
    }

    .todo-item {
      padding: 10px;
    }
    .even-todo-item {
      background-color: red;
    }
    .odd-todo-item {
      background-color: lightblue;
    }
  `]
})
export class Solution5Component {
  items: any[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  term = '';

  title = 'Ng2SearchPipeModule';
  
  searchText: any;
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
