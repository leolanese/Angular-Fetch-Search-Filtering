import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export const searchCountryEntity = (term: string): (() => Observable<any>) => {
  const http = inject(HttpClient);
  const endpoint = 'https://restcountries.com/v3.1/name/';
  let url = `${endpoint}${term}`;

  return () => http.get<any[]>(url).pipe(
    map(response => response),
    catchError(error => of(error))
  );
} 

