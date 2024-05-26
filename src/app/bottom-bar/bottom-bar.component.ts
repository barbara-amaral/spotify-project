import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css',
  imports: [ProgressBarComponent],
})
export class BottomBarComponent {}
