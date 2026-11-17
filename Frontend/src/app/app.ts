
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Students } from './students/students';

@Component({
  imports: [RouterOutlet, Students],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
