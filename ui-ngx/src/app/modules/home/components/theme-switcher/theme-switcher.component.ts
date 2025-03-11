import { Component, OnInit } from '@angular/core';
import { ThemeService} from "@core/services/theme.service";

@Component({
  selector: 'tb-theme-switcher',
  templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.loadTheme();
  }

  applyTheme(primary: string, secondary: string) {
    this.themeService.setTheme(primary, secondary);
  }
}
