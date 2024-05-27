import { Component, Output, SimpleChanges } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css',
  imports: [ProgressBarComponent, CommonModule],
})
export class BottomBarComponent {
  play: boolean = false;
  currentProgress: number = 0;

  toggle() {
    this.play = !this.play;
  }

  onProgressChanged(progress: number) {
    this.currentProgress = progress;
    if (this.currentProgress >= 99.9) {
      this.toggle();
    }
  }
}
