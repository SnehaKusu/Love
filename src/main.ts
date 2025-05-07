import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MemoryPageComponent } from './app/memory-page/memory-page.component';

const routes: Routes = [
  { path: '', component: MemoryPageComponent },
  // Add more routes as needed
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));