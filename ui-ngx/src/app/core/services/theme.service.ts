import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private styleSheet: HTMLStyleElement;

  constructor() {
    this.styleSheet = document.createElement('style');
    document.head.appendChild(this.styleSheet);
    this.loadTheme();
  }

  setTheme(primary: string, secondary: string) {
    const css = `
      :root {
        --tb-primary-color: ${primary};
        --tb-secondary-color: ${secondary};
        --tb-warn-color: #ff5722; // Override orange
      }
      .mat-toolbar, .mat-sidenav,
      .mat-button.mat-primary, .mat-raised-button.mat-primary,
      .mat-icon-button.mat-primary {
        background-color: var(--tb-primary-color) !important;
        color: #ffffff !important;
      }
      .mat-button.mat-accent, .mat-raised-button.mat-accent,
      .mat-icon-button.mat-accent {
        background-color: var(--tb-accent-color) !important;
        color: #ffffff !important;
      }
      .mat-button.mat-warn, .mat-raised-button.mat-warn,
      .mat-icon-button.mat-warn {
        background-color: var(--tb-warn-color) !important;
        color: #ffffff !important;
      }
    `;
    this.styleSheet.textContent = css;
    localStorage.setItem('theme', JSON.stringify({ primary, secondary }));
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      const { primary, secondary } = JSON.parse(saved);
      this.setTheme(primary || '#3f51b5', secondary || '#ff4081');
    } else {
      this.setTheme('#3f51b5', '#ff4081');
    }
  }
}
