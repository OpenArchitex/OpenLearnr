import { browser } from 'protractor';
import { NavBarPage } from '../../page-objects/jhi-page-objects';
import { StudentComponentsPage, StudentUpdatePage } from './student.page-object';

describe('Student e2e test', () => {
    let navBarPage: NavBarPage;
    let studentUpdatePage: StudentUpdatePage;
    let studentComponentsPage: StudentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Students', () => {
        navBarPage.goToEntity('student');
        studentComponentsPage = new StudentComponentsPage();
        expect(studentComponentsPage.getTitle()).toMatch(/Students/);
    });

    it('should load create Student page', () => {
        studentComponentsPage.clickOnCreateButton();
        studentUpdatePage = new StudentUpdatePage();
        expect(studentUpdatePage.getPageTitle()).toMatch(/Create or edit a Student/);
        studentUpdatePage.cancel();
    });

    it('should create and save Students', () => {
        studentComponentsPage.clickOnCreateButton();
        studentUpdatePage.setUserIdInput('5');
        expect(studentUpdatePage.getUserIdInput()).toMatch('5');
        studentUpdatePage.setLastWatchedVideoInput('lastWatchedVideo');
        expect(studentUpdatePage.getLastWatchedVideoInput()).toMatch('lastWatchedVideo');
        studentUpdatePage.setLastWatchedVideoTimeInput('5');
        expect(studentUpdatePage.getLastWatchedVideoTimeInput()).toMatch('5');
        studentUpdatePage.save();
        expect(studentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
