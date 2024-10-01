import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient provider
import { withFetch } from '@angular/common/http'; // Import withFetch

// Combine the providers from appConfig and the new HttpClient provider
const providers = [
  provideHttpClient(withFetch()), // Configure HttpClient to use fetch
  ...(appConfig.providers || []), // Merge existing providers, if any
];

// Bootstrap the application with the AppComponent and the combined providers
bootstrapApplication(AppComponent, {
  providers, // Use the combined providers array
  // Do not spread appConfig here; it's already included in providers
})
.catch((err) => console.error(err));
