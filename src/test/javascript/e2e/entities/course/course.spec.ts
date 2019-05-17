import { browser } from 'protractor';
import { NavBarPage } from '../../page-objects/jhi-page-objects';
import { CourseComponentsPage, CourseUpdatePage } from './course.page-object';

describe('Course e2e test', () => {
    let navBarPage: NavBarPage;
    let courseUpdatePage: CourseUpdatePage;
    let courseComponentsPage: CourseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Courses', () => {
        navBarPage.goToEntity('course');
        courseComponentsPage = new CourseComponentsPage();
        expect(courseComponentsPage.getTitle()).toMatch(/Courses/);
    });

    it('should load create Course page', () => {
        courseComponentsPage.clickOnCreateButton();
        courseUpdatePage = new CourseUpdatePage();
        expect(courseUpdatePage.getPageTitle()).toMatch(/Create or edit a Course/);
        courseUpdatePage.cancel();
    });

    it('should create and save Courses', () => {
        courseComponentsPage.clickOnCreateButton();
        courseUpdatePage.setNameInput('name');
        expect(courseUpdatePage.getNameInput()).toMatch('name');
        courseUpdatePage.save();
        expect(courseUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
