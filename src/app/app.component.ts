import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, tap, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { Country } from './Modules/country';
import { CountryService } from './services/country.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './Pipes/filter.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HttpClientModule, CommonModule, 
    FormsModule, FilterPipe ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-search-using-observables';
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

