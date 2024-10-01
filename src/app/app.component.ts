import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './chart/chart.component'; // Import the ChartComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartComponent], // Add ChartComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected from styleUrl to styleUrls
})
export class AppComponent {
  title = 'cpravwap1';
}