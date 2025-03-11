import { Component, OnInit } from '@angular/core';
import { ThemeService} from "@core/services/theme.service";

@Component({
  selector: 'tb-theme-switcher',
  templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent implements OnInit {
  mode: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.loadTheme();
    const saved = JSON.parse(localStorage.getItem('theme') || '{}');
    this.mode = saved.mode || 'light';
  }

  applyTheme(primary: string, secondary: string) {
    this.themeService.setTheme(primary, secondary, this.mode);
  }

  toggleMode() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    const { primary, secondary } = JSON.parse(localStorage.getItem('theme') || '{}');
    this.themeService.setTheme(primary || '#3f51b5', secondary || '#ff4081', this.mode);
  }
}
