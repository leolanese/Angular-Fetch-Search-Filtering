import { Component, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap, Subscription, takeUntil } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../Services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ title }}</h2>
    <div class="container">
      <form>
          <input
            #searchBox
            (input)="onSearch(searchBox.value)"
            type="text"
            class="form-control"
            autocomplete="on" 
            placeholder="{{ title }}" />

            <!-- <pre>{{ countries$ | async | json }}</pre> -->
            <ul>
                @for(country of countries$ | async; track country.idd) {
                  <li class="list-group-item list-group-item-action">
                  <img src="{{ country.flags.svg }}" alt="Flag of {{ country.name.official }}" class="country-flag" />
                    <div class="d-flex align-items-center ms-3">
                      <i class="fas fa-search me-2"></i>
                      <p class="country-name mb-0">{{ country.name.official }}</p>
                    </div>
                  </li>
                }
            </ul>

      </form>
  </div>`
})
export class Solution2Component {
  title = '2- Template reference variable (#), event-binding()';

  countryService = inject(CountryService);
  
  countries$: Observable<Country[]> = of([]);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  
  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit(): void {
    this.countries$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.countryService.searchCountries(searchTerm).pipe(
        takeUntil(this.destroy$)
      ))
    )
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
