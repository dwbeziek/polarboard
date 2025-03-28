///
/// Copyright © 2016-2024 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { environment as env } from '@env/environment';
import {AdminService} from "@core/http/admin.service";
import {BrandingSettings} from "@shared/models/settings.models";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private translate: TranslateService,
    private adminService: AdminService,
    private title: Title
  ) {}

  setTitle(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslate?: TranslateService
  ) {
    // this.adminService.getBrandingSettings<BrandingSettings>().subscribe((settings) => {
      // const branding = settings.jsonValue;
      // const brandTitle = branding.title || `${env.appTitle}`;
      const brandTitle = `${env.appTitle}`;
      let lastChild = snapshot;
      while (lastChild.children.length) {
        lastChild = lastChild.children[0];
      }
      const { title } = lastChild.data;
      const translate = lazyTranslate || this.translate;
      if (title) {
        translate
          .get(title)
          .pipe(filter(translatedTitle => translatedTitle !== title))
          .subscribe(translatedTitle =>
            this.title.setTitle(`${brandTitle} | ${translatedTitle}`)
          );
      } else {
        this.title.setTitle(brandTitle);
      }

    // });

  }
}
