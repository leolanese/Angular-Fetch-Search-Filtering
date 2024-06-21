import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Solution1Component } from "./Components/solution1/solution1.component";
import { Solution2Component } from './Components/solution2/solution2.component';
import { Solution3Component } from './Components/solution3/solution3.component';
import { Solution4Component } from "./Components/solution4/solution4.component";
import { Solution5Component } from "./Components/solution5/solution5.component";
import { Solution6Component } from './Components/solution6/solution6.component';
import { Solution7Component } from "./Components/solution7/solution7.component";
import { Solution8Component } from "./Components/solution8/solution8.component";
import { Solution9Component } from "./Components/solution9/solution9.component";
import { Solution10Component } from "./Components/solution10/solution10.component";
@Component({
    selector: 'app-root',
    standalone: true,
    template: `
      <h1>{{ title }}</h1>

      <!-- <app-solution1></app-solution1>
      <app-solution2></app-solution2>
      <app-solution3></app-solution3> 
      <app-solution4></app-solution4>
      <app-solution5></app-solution5>
      <app-solution6></app-solution6>
      <app-solution7></app-solution7>
      <app-solution8></app-solution8>
      <app-solution9></app-solution9>
      <app-solution10></app-solution10> -->

      <nav>
      <a routerLink="/solution1">Solution 1</a> /
      <a routerLink="/solution2">Solution 2</a> /
      <a routerLink="/solution3">Solution 3</a> /
      <a routerLink="/solution4">Solution 4</a> / 
      <a routerLink="/solution5">Solution 5</a> /
      <a routerLink="/solution6">Solution 6</a> /
      <a routerLink="/solution7">Solution 7</a> /
      <a routerLink="/solution8">Solution 8</a> /
      <a routerLink="/solution9">Solution 9</a> /
      <a routerLink="/solution10">Solution 10</a> /
    </nav>
    <router-outlet></router-outlet>
    `,
    imports: [
        RouterModule, RouterOutlet, HttpClientModule, CommonModule,
        Solution1Component,
        Solution2Component,
        Solution3Component,
        Solution4Component,
        Solution5Component,
        Solution6Component,
        Solution7Component,
        Solution8Component,
        Solution9Component,
        Solution10Component
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular search and filters playground area';
}

