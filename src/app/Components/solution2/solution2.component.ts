import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable, of, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { Country } from '../../Modules/country';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-solution2',
  standalone: true,
  imports: [CommonModule,
            FilterPipe],
  template: `
    <h3>{{ title }}</h3>
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
                @for(country of countries$ | async| filter: searchText; track country.idd) {
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
export class Solution2Component implements OnInit {
  title = '2- Pipe + Template reference variable (#), event-binding() + searchSubject + takeUntilDestroyed';
  searchText: string = '';

  private countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef);
  
  countries$: Observable<Country[]> = of([]);
  private searchSubject$ = new Subject<string>();

  onSearch(term: string) {
    this.searchText = term;
    this.searchSubject$.next(term);
  }

  ngOnInit(): void {
    this.countries$ = this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => 
        this.countryService.searchCountries(searchTerm)
      ),
      takeUntilDestroyed(this.destroyRef) 
    )
  }

}
