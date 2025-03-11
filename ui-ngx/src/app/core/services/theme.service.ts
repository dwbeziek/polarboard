import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private styleSheet: HTMLStyleElement;

  constructor() {
    this.styleSheet = document.createElement('style');
    document.head.appendChild(this.styleSheet);
  }

  setTheme(primary: string, secondary: string, mode: 'light' | 'dark') {
    const css = `
      :root {
        --tb-primary: ${primary};
        --tb-accent: ${secondary};
        --tb-background: ${mode === 'light' ? '#fafafa' : '#303030'};
        --tb-text: ${mode === 'light' ? '#212121' : '#ffffff'};
        --tb-surface: ${mode === 'light' ? '#ffffff' : '#424242'};
      }
      body, .tb-container {
        background-color: var(--tb-background);
        color: var(--tb-text);
      }
      .mat-primary, .mat-button.mat-primary {
        background-color: ${primary} !important;
        color: ${mode === 'light' ? '#fff' : '#fff'};
      }
      .mat-accent, .mat-button.mat-accent {
        background-color: ${secondary} !important;
        color: ${mode === 'light' ? '#fff' : '#fff'};
      }
      .mat-card, .mat-dialog-container {
        background-color: var(--tb-surface);
        color: var(--tb-text);
      }
    `;
    this.styleSheet.textContent = css;
    document.body.classList.toggle('dark-theme', mode === 'dark');
    localStorage.setItem('theme', JSON.stringify({ primary, secondary, mode }));
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      const { primary, secondary, mode } = JSON.parse(saved);
      this.setTheme(primary || '#3f51b5', secondary || '#ff4081', mode || 'light');
    } else {
      this.setTheme('#3f51b5', '#ff4081', 'light'); // Default
    }
  }
}
