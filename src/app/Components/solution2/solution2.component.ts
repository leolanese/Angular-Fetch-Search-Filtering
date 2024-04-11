import { Component, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-solution2',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './solution2.component.html',
  styleUrl: './solution2.component.scss'
})
export class Solution2Component {
  title = 'Pipe, template with ngModel, ngModelOnChange, 2-way-binding [()]';
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
