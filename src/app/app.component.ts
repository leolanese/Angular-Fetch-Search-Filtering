import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, tap, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { Country } from './Modules/country';
import { CountryService } from './Services/country.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './Pipes/filter.pipe';
import { Solution1Component } from "./Components/solution1/solution1.component";
import { Solution2Component } from './Components/solution2/solution2.component';
import { Solution3Component } from './Components/solution3/solution3.component';
import { Solution4Component } from "./Components/solution4/solution4.component";
import { Solution5Component } from "./Components/solution5/solution5.component";
@Component({
    selector: 'app-root',
    standalone: true,
    template: `
      <h1>{{ title }}</h1>

      <!-- <app-solution1></app-solution1>
      <app-solution2></app-solution2>
      <app-solution3></app-solution3>  -->
      <app-solution4></app-solution4>
      <app-solution5></app-solution5>
    `,
    imports: [
        RouterOutlet, HttpClientModule, CommonModule,
        Solution1Component,
        Solution2Component,
        Solution3Component,
        Solution4Component,
        Solution5Component
    ]
})
export class AppComponent {
  title = 'Angular searchs playground area';
}

