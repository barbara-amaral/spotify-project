import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BottomBarComponent } from '../bottom-bar/bottom-bar.component';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, BottomBarComponent],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  @Input()
  isPlaying: boolean = false;
}
