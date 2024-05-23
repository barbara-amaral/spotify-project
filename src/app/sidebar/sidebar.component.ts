import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  folders = [
    {
      src: '../../assets/liked-songs.png',
      alt: 'liked songs folder',
      index: 1,
      text: 'Músicas curtidas',
      songsQuantity: '1.273 músicas',
      playlist: false,
    },
    {
      src: '../../assets/episodes.png',
      alt: 'episodes folder',
      index: 2,
      text: 'Seus episódios',
      episodesInformation: 'Episódios salvos e baixados',
      playlist: false,
    },
    {
      src: '../../assets/capa-1.png',
      alt: 'episodes folder',
      index: 2,
      text: 'FUNK PUTARIA 🔞🥵 MANDELAO PESADO DE SP MAIO 2024🔥',
      episodesInformation: 'fer',
      playlist: true,
    },
    {
      src: '../../assets/capa-2.png',
      alt: 'episodes folder',
      index: 2,
      text: 'sz',
      episodesInformation: 'Bárbara Souza',
      playlist: true,
    },
    {
      src: '../../assets/capa-3.png',
      alt: 'episodes folder',
      index: 2,
      text: 'Heavy Metal Classics (Top 100)',
      episodesInformation: 'Misi',
      playlist: true,
    },
    {
      src: '../../assets/capa-4.png',
      alt: 'episodes folder',
      index: 2,
      text: 'PAGODE DA LUD 💜 | ludmilla pagode numanice | toda maliciosa gostosa | ludmila pagode | lud numanice',
      episodesInformation: '@bussola',
      playlist: true,
    },
    {
      src: '../../assets/capa-5.png',
      alt: 'episodes folder',
      index: 2,
      text: 'Simple Plan: The Complete Collection',
      episodesInformation: 'Simple Plan',
      playlist: true,
    },
    {
      src: '../../assets/capa-6.png',
      alt: 'episodes folder',
      index: 2,
      text: 'This is Pink Floyd',
      episodesInformation: 'Spotify',
      playlist: true,
    },
    {
      src: '../../assets/capa-7.png',
      alt: 'episodes folder',
      index: 2,
      text: 'Metal Essentials',
      episodesInformation: 'Spotify',
      playlist: true,
    },
  ];

  showDropdown: number | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  onMouseEnter(event: MouseEvent) {
    const folder = (event.target as HTMLElement).closest('.folder');
    const dropdown = (event.target as HTMLElement)
      .closest('.folder-container')
      ?.querySelector('.dropdown') as HTMLElement;

    if (folder && dropdown) {
      const rect = folder.getBoundingClientRect();
      this.renderer.setStyle(dropdown, 'top', `${rect.bottom - 50}px`);
      this.renderer.setStyle(dropdown, 'left', `${rect.left + 50}px`);
    }
  }
}
