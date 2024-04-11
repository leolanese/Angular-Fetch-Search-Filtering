import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solution4',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule, 
    ReactiveFormsModule,
    MatInputModule],
    template: `
    <div class="list-container">
      <form [formGroup]="filterForm">
        <mat-form-field class="example-full-width">
          <input matInput placeholder="{{ title }}" formControlName="searchFilter">
        </mat-form-field>
      </form>
      <ng-container *ngFor="let todoItem of todoData$ | async | search: 'title' : searchFilter | slice:0:5; 
          let i = index; let isEven = even; let isOdd = odd">
          <div
            class="todo-item"
            [ngClass]="{'even-todo-item': isEven, 'odd-todo-item': isOdd}">
            {{ todoItem.title }}
          </div>
      </ng-container>
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
export class Solution4Component {
  title = 'Pipe + Material';

  todoData$!: Observable<any[]> | undefined;
  
  filterForm: FormGroup = new FormGroup({
    searchFilter: new FormControl<string>('')
  });
  filterFormSubsription: Subscription;
  searchFilter: string = '';

  constructor(private httpClient: HttpClient) {
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
