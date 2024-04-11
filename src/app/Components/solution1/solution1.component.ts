import { Component, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution1',
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule],
  template: `
    <h2>{{ title }}</h2>
    <div class="container">
        <input 
          [(ngModel)]="searchText" 
          (ngModelChange)="onSearch($event)"
          type="text"
          class="form-control"
          placeholder="Search using ngModel, ngModelChange and 2-way-binding" />

        <ul>
          <li *ngFor="let country of countries$ | async | filter: searchText">
            {{ country.name?.common }}
          </li>
        </ul>
    </div>
  `,
  styleUrl: './solution1.component.scss'
})
export class Solution1Component {
  title = 'Pipe, template with ngModel, ngModelOnChange, 2-way-binding';
  isLoading = false;
  searchText = '';

  countryService = inject(CountryService);
  
  countries$: Observable<Country[]> = of([]);
  private searchSubject = new Subject<string>();

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit() {
    this.countries$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.isLoading = true;
        return this.countryService.searchCountries(searchTerm).pipe(
          switchMap(countries => {
            this.isLoading = false;
            return of(countries);
          })
        );
      })
    );
  }
}
