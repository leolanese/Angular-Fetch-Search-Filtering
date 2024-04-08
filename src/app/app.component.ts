import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from './Modules/country';
import { CountryService } from './services/country.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-search-using-observables';
  loading: boolean = false;
  
  countries$!: Observable<Country[]>;
  private searchTerms = new Subject<string>();

  countryService = inject(CountryService);

  onSearch(term: string) {
    this.searchTerms.next(term);
  }
  
  ngOnInit(): void {
    this.countries$ = this.searchTerms.pipe(
      tap((_) => (this.loading = true)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.countryService.searchCountry(term)),
      tap((_) => (this.loading = false)),
      tap(x => console.table(x))
    );
  }

}
