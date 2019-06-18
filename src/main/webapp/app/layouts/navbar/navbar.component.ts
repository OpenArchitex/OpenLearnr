import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ICourse } from 'app/shared/model/course.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CourseService } from 'app/entities/course';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
  courses: ICourse[];
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  eventSubscriber: Subscription;

  constructor(
    private courseService: CourseService,
    private jhiAlertService: JhiAlertService,
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.loadAll();
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
    this.registerAuthenticationSuccess();
    this.registerChangeInCourses();
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  loadAll() {
    this.courseService.query().subscribe(
      (res: HttpResponse<ICourse[]>) => {
        this.courses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  registerAuthenticationSuccess() {
    this.eventSubscriber = this.eventManager.subscribe('authenticationSuccess', () => this.loadAll());
  }

  registerChangeInCourses() {
    this.eventSubscriber = this.eventManager.subscribe('courseListModification', () => this.loadAll());
  }
}
