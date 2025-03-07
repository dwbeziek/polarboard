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

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { PageComponent } from '@shared/components/page.component';
import { HasConfirmForm } from '@core/guards/confirm-on-exit.guard';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { UntypedFormGroup } from '@angular/forms';
import {BrandingSettingsComponent} from "@home/components/branding/branding-settings.component";

@Component({
  selector: 'tb-branding-admin-settings',
  templateUrl: './branding-admin-settings.component.html',
  styleUrls: []
})
export class BrandingAdminSettingsComponent extends PageComponent implements OnInit, OnDestroy, HasConfirmForm {

  @ViewChild('brandingSettingsComponent') brandingSettingsComponent: BrandingSettingsComponent;

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
  }

  confirmForm(): UntypedFormGroup {
    return this.brandingSettingsComponent?.brandingSettingsFormGroup;
  }
}
