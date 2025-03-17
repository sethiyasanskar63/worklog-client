import { Component } from '@angular/core';
import { BaseComponent } from './base/base.component';

@Component({
  selector: 'app-root',
  imports: [BaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'worklog-client';
}
