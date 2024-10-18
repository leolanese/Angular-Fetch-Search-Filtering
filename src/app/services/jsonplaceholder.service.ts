import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Country {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // JSONPlaceholder URL

  constructor(private http: HttpClient) {}

  // Define the getCountries() method
  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      // Transform the data to the expected structure
      map(users => users.map(user => ({ name: user.name })))
    );
  }
}
