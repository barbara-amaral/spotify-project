import { Component } from '@angular/core';
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

  toggle() {
    this.play = !this.play;
  }
}
