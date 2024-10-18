import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {Observable,of} from 'rxjs';
import {catchError,map} from 'rxjs/operators';

export const searchCountryEntity = (term: string): (() => Observable<any>) => {
  const http = inject(HttpClient);
  const endpoint = 'https://restcountries.com/v3.1/name/';
  let url = `${endpoint}${term}`;

  return () => http.get<any[]>(url).pipe(
    map(response => response),
    catchError(error => of(error))
  );
} 

