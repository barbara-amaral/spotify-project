import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Output()
  progressChanged = new EventEmitter<number>();
  @Input() progress: number = 0;

  private animationFrameId: number | null = null;
  private startTime: number | null = null;
  private elapsedTime: number = 0;
  private duration: number = 20000;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isPlaying']) {
      console.log(this.isPlaying);
      if (this.isPlaying) {
        this.resumeAnimation();
      } else {
        console.log('pausou');
        this.pauseAnimation();
      }
    }
  }

  startAnimation(): void {
    this.progress = 0;
    this.elapsedTime = 0;
    this.startTime = performance.now();
    this.animate();
  }

  animate(): void {
    if (!this.startTime) return;
    this.animationFrameId = requestAnimationFrame((timestamp) => {
      const elapsed = timestamp - this.startTime! + this.elapsedTime;
      this.progress = Math.min((elapsed / this.duration) * 100, 100);

      this.progressChanged.emit(this.progress);

      if (this.progress < 100 && this.isPlaying) {
        this.animate();
      } else {
        this.isPlaying = false;
        this.elapsedTime = elapsed;
      }
    });
  }

  pauseAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      this.elapsedTime += performance.now() - (this.startTime ?? 0);
    }
  }

  resumeAnimation(): void {
    if (!this.animationFrameId) {
      this.startTime = performance.now();
      this.animate();
    }
  }
}
