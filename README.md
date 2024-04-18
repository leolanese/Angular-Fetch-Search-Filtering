# Angular Fetch Search and filtering

## Angular fetch On Data From API. Using stand-alone Components, Observables and Subject strategies

- We are going to follow the `reactive forms` input value changes to fetch data from API. Using a `pipe to filter` data based on search input term: The Filter will filter the `payload from API end-point`.

### Goal Keys

- Reactive forms input value changes
- Subscribe to API payload changes
- Show Filter data based on search input term
- Filtering: The end-point is already filtering depending on the user-input, but including the filter pipe in our template (countries$ | async | filter:searchFilter), Angular will apply the FilterPipe's transform method to the countries$ observable's emitted values. This means, that each time the countries$ observable emits a new array of countries, Angular will filter those (can be multiple) countries based on the searchFilter string using the logic defined in the FilterPipe. To test: input `UK` it should return only `Ukraine` then check for the console. You must see: `Filter pipe triggered:  true` once 

## Different solutions to filter data based on search input

1) Pipe + ngModel, ngModelOnChange + 2-way-binding[()]

2) Pipe + Template reference variable (#), event-binding() + + searchSubject

3) Pipe + Angular Reactive forms: formGroup, formControl (directly binding the FormControl instance)

4) Pipe + Material + Reactive forms: FormGroup, formControlName (directly bind to specific input element within the template) + .get()

5) Ng2SearchPipeModule Pipe + Reactive form (formControlName)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17+

```js
ng new Angular-Search-Filtering

npm i
npm i bootstrap
```

```js
// package.json
"styles": [
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "src/styles.scss"
]
```

```js
ng g s services/country
// later on exploring the Entity Pattern

ng g p pipes/filter
// reusable pipe to filter array based on search term
```

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---
### :100: <i>Thanks!</i>
#### Now, don't be an stranger. Let's stay in touch!

<a href="https://github.com/leolanese" target="_blank" rel="noopener noreferrer">
  <img src="https://scastiel.dev/api/image/leolanese?dark&removeLink" alt="leolanese’s GitHub image" width="600" height="314" />
</a>

##### :radio_button: Linkedin: <a href="https://www.linkedin.com/in/leolanese/" target="_blank">LeoLanese</a>
##### :radio_button: Twitter: <a href="https://twitter.com/LeoLanese" target="_blank">@LeoLanese</a>
##### :radio_button: Portfolio: <a href="https://www.leolanese.com" target="_blank">www.leolanese.com</a>
##### :radio_button: DEV.to: <a href="https://www.dev.to/leolanese" target="_blank">dev.to/leolanese</a>
##### :radio_button: Blog: <a href="https://www.leolanese.com/blog" target="_blank">leolanese.com/blog</a>
##### :radio_button: Questions / Suggestion / Recommendation: developer@leolanese.com
