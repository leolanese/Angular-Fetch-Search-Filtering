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

      <div>
        <input 
          type="text" 
          [(ngModel)]="term"
          placeholder="{{title}}" />
        <div *ngFor = "let item of items |filter:term" >
          <p>
            {{item.name}}
          </p>
        </div>

    </div>
     </div>`,
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


  searchFilter: string = '';

  httpClient = inject(HttpClient);
  


}
