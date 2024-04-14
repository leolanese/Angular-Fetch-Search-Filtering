import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-solution4',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule, 
            ReactiveFormsModule,
            MatInputModule],
  template: `
     <h2>{{ title }}</h2>

     <div class="container">
      <form [formGroup]="filterForm">
          <input matInput           
            type="text"
            class="form-control" 
            placeholder="{{ title }}" 
            autocomplete="on" 
            formControlName="searchFilter" />
      </form>
      
      <ng-container *ngFor="let todoItem of todoData$ | async | search: 'title' : searchFilter | slice:0:5; 
          let i = index; let isEven = even; let isOdd = odd">
          <div
            class="todo-item"
            [ngClass]="{'even-todo-item': isEven, 'odd-todo-item': isOdd}">
            {{ todoItem.title }}
          </div>
      </ng-container>
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
export class Solution4Component {
  title = 'Pipe + Angular Material';

  // FormGroup
  todoData$!: Observable<any[]> | undefined;
    filterForm: FormGroup = new FormGroup({
      searchFilter: new FormControl<string>('')
  });

  filterFormSubsription: Subscription;
  searchFilter: string = '';

  httpClient = inject(HttpClient);
  countryService = inject(CountryService);
  
  constructor() {
    // TODO: move to the same API endpoint as in the previous example
    const todoDataUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.todoData$ = this.httpClient.get(todoDataUrl)
      .pipe(map(response => {
        const data = response as any[];
        return data;
      }));

    this.filterFormSubsription = this.filterForm.valueChanges
      .pipe(debounceTime(400)).subscribe(changes => {
        this.searchFilter = changes.searchFilter;
      })
  }

  ngOnDestroy(): void {
    this.filterFormSubsription.unsubscribe();
  }

}
