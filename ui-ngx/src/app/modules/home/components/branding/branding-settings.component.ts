///
/// Copyright © 2025 Cryolytix
/// All rights reserved.
///
/// This software is the confidential and proprietary information of Cryolytix.
/// You may not disclose, reproduce, or distribute this software without prior
/// written permission from Cryolytix, except as permitted by applicable law.
/// This software is provided "AS IS" without warranty of any kind, express or
/// implied, including but not limited to warranties of merchantability or
/// fitness for a particular purpose.
///


import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@core/core.state';
import {PageComponent} from '@shared/components/page.component';
import {FormBuilder, UntypedFormGroup} from '@angular/forms';
import {AdminSettings, BrandingSettings} from '@shared/models/settings.models';
import {AdminService} from '@core/http/admin.service';
import {HasConfirmForm} from '@core/guards/confirm-on-exit.guard';
import {TranslateService} from '@ngx-translate/core';
import {WINDOW} from "@core/services/window.service";

@Component({
  selector: 'tb-branding-settings',
  templateUrl: './branding-settings.component.html',
  styleUrls: ['./branding-settings.component.scss', '../../pages/admin/settings-card.scss']
})
export class BrandingSettingsComponent extends PageComponent implements OnInit, OnDestroy, HasConfirmForm {

  adminSettings: AdminSettings<BrandingSettings>;
  showMainLoadingBar = false;

  brandingSettingsFormGroup = this.fb.group({
    logoPath: [''],
    faviconPath: [''],
    primaryColor: [''],
    accentColor: [''],
    title: [''],
    footerText: [''],
    loginText: [''],
  });

  constructor(protected store: Store<AppState>,
              private adminService: AdminService,
              private translate: TranslateService,
              private fb: FormBuilder,
              @Inject(WINDOW) private window: Window) {
    super(store);
  }

  ngOnInit(): void {
    this.adminService.getAdminSettings<BrandingSettings>('branding').subscribe((settings) => {
      this.adminSettings = settings;
      this.brandingSettingsFormGroup.patchValue(this.processBrandingSettings(settings.jsonValue));
    });
  }

  save(): void {
    if (this.brandingSettingsFormGroup.valid) {
      // const updatedSettings: BrandingSettings = this.brandingSettingsFormGroup.value;
      this.adminSettings.jsonValue = this.brandingSettingsFormGroup.value;
      this.adminService.saveAdminSettings(this.adminSettings).subscribe((adminSettings) => {
        (adminSettings) => {
          this.adminSettings = adminSettings;
          this.brandingSettingsFormGroup.reset(this.adminSettings.jsonValue, {emitEvent: false});
        }
      });
    }
  }

  private processBrandingSettings(jsonValue: any): any {
    return {
      logoPath: jsonValue.logoPath || '',
      faviconPath: jsonValue.faviconPath || '',
      primaryColor: jsonValue.primaryColor || '#2e7d32',
      accentColor: jsonValue.accentColor || '#ffb300',
      title: jsonValue.title || 'Cryolytix',
      footerText: jsonValue.footerText || '© 2025 Cryolytix',
      loginText: jsonValue.loginText || 'Welcome to Cryolytix'
    };
  }



// save(): void {
  //   this.securitySettings = {...this.securitySettings, ...this.securitySettingsFormGroup.value};
  //   this.adminService.saveSecuritySettings(this.securitySettings).subscribe(
  //     securitySettings => this.processSecuritySettings(securitySettings)
  //   );
  // }


  confirmForm(): UntypedFormGroup {
    return this.brandingSettingsFormGroup;
  }

}
