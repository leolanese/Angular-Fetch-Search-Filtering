import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {})
  .catch((err: Error) => {
    console.log(err.message);
    console.log((err.cause as Error)?.message);
  });