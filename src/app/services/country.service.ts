import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { Country } from '../Modules/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  endpoint: string = 'https://restcountries.com/v3.1/name/';
  http = inject(HttpClient);
  
  searchCountries(term: string): Observable<Country[]> {
    let url = `${this.endpoint}${term}`;

    if (!term.trim()) return of([]);

    return this.http
      .get<Country[]>(url)
      .pipe(catchError(this.handleError<Country[]>('countries', [])));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }

}
