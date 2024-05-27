import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
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
  @Input() isPlaying: boolean = false;
  @Output() progressChanged = new EventEmitter<number>();
  @Input() progress: number = 0;

  @ViewChild('slider') slider!: ElementRef;

  sliderValue: number = 0;
  private animationFrameId: number | null = null;
  private startTime: number | null = null;
  private elapsedTime: number = 0;
  private duration: number = 233000;
  private isDragging: boolean = false;
  private elapsedTimeOnMouseDown: number = 0;

  ngAfterViewInit(): void {
    this.updateOutput(this.slider.nativeElement.value);
    this.slider.nativeElement.oninput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      this.updateOutput(Number(input.value));
    };

    this.slider.nativeElement.addEventListener(
      'mousedown',
      this.onMouseDown.bind(this)
    );
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isPlaying']) {
      if (this.isPlaying) {
        if (this.progress >= 99 || this.progress >= 100) {
          this.startAnimation();
        }

        this.resumeAnimation();
      } else {
        this.pauseAnimation();
      }
    }
  }

  updateOutput(value: number): void {
    this.sliderValue = value;
    this.progressChanged.emit(this.sliderValue);
    this.updateSliderBackground(value);
  }

  updateSliderBackground(value: number): void {
    const percentage = (value / this.slider.nativeElement.max) * 100;
    this.slider.nativeElement.style.backgroundSize = `${percentage}% 100%`;
  }

  animate(): void {
    if (!this.startTime) return;
    this.animationFrameId = requestAnimationFrame((timestamp) => {
      const elapsed = timestamp - this.startTime! + this.elapsedTime;
      const newProgress = Math.min((elapsed / this.duration) * 100, 100);

      this.updateOutput(newProgress);

      if (newProgress < 100 && this.isPlaying) {
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
      if (!this.isDragging) {
        this.startTime = performance.now();
      }
      this.animate();
    }
  }

  startAnimation(): void {
    this.progress = 0;
    this.elapsedTime = 0;
    this.startTime = performance.now();
    this.animate();
  }

  onMouseDown(): void {
    if (this.isPlaying) {
      this.isDragging = true;
      this.elapsedTimeOnMouseDown = this.elapsedTime;
      this.pauseAnimation();
    }
  }

  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      const newProgress =
        (this.sliderValue / this.slider.nativeElement.max) * 100;
      const newStartTime =
        performance.now() - (this.duration * newProgress) / 100;
      this.startTime = newStartTime;
      this.elapsedTime = (newProgress / 100) * this.duration;
      this.resumeAnimation();
    }
  }
}
