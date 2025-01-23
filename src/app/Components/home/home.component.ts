import {Component} from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        {{pageTitle}}
      </div>
      <div class="card-body">
        <div class="container-fluid">

          <div class="text-center">Developed by:</div>
          <div class="text-center">
            <h3>Leo Lanese</h3>
          </div>

        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  public pageTitle = 'Angular search & filters playground area';

}