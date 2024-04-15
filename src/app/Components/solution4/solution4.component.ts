import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { CountryService } from '../../Services/country.service';

@Component({
  selector: 'app-solution4',
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule, 
            ReactiveFormsModule,
            MatInputModule],
  template: `
     <h2>{{ title }}</h2>

     <div class="container">
      <!-- binds the <form> element to a FormGroup instance called filterForm -->
      <!-- As the user types in the input field, the "searchFilter" form control value is updated automatically by Reactive Forms -->
      <form [formGroup]="filterForm">
          <input 
            matInput    
            formControlName="searchFilter"        
            type="text"
            class="form-control" 
            placeholder="{{ title }}" 
            autocomplete="on" />
      </form>
      
      <ng-container *ngFor="let todoItem of todoData$ | async | filter: searchFilter | slice:0:5; 
                            let i = index; let isEven = even; let isOdd = odd">
          <div
            class="todo-item"
            [ngClass]="{'even-todo-item': isEven, 'odd-todo-item': isOdd}">
            {{ todoItem.name.common }}
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
export class Solution4Component implements OnInit, OnDestroy  {
  title = '4- Pipe + Angular Material + + Reactive forms (FormGroup, formControlName)';
  todoData$!: Observable<any[]> | undefined;
  searchFilter: string = '';
  filterFormSubscription?: Subscription = new Subscription(); 

  countryService = inject(CountryService);
  
  // Connect filter form value changes to searchFilter
  filterForm: FormGroup = new FormGroup({
      searchFilter: new FormControl<string>('')
  });

     
  ngOnInit() {
    this.filterFormSubscription = this.filterForm.get('searchFilter')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap((countries) => {
            return of(countries);
          })
        );
      })
    ).subscribe((filteredData) => {
      this.todoData$ = of(filteredData);
    });
  }

  ngOnDestroy(): void {
    !!this.filterFormSubscription &&  this.filterFormSubscription.unsubscribe();
  }

}
