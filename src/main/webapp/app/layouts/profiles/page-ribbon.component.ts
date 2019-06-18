import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileInfo } from './profile-info.model';
import { VERSION } from 'app/app.constants';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    <div class="ribbon" *ngIf="ribbonEnv">
      <a href=""
        >{{ ribbonEnv }} : <span class="navbar-version">{{ version }}</span></a
      >
    </div>
  `,
  styleUrls: ['page-ribbon.scss']
})
export class PageRibbonComponent implements OnInit {
  profileInfo: ProfileInfo;
  ribbonEnv: string;
  version: string;

  constructor(private profileService: ProfileService) {
    this.version = VERSION ? 'v' + VERSION : '';
  }

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
      this.ribbonEnv = profileInfo.ribbonEnv;
    });
  }
}
