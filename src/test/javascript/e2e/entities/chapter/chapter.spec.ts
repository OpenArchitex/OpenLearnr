import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ChapterComponentsPage, ChapterUpdatePage } from './chapter.page-object';

describe('Chapter e2e test', () => {
    let navBarPage: NavBarPage;
    let chapterUpdatePage: ChapterUpdatePage;
    let chapterComponentsPage: ChapterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Chapters', () => {
        navBarPage.goToEntity('chapter');
        chapterComponentsPage = new ChapterComponentsPage();
        expect(chapterComponentsPage.getTitle()).toMatch(/Chapters/);
    });

    it('should load create Chapter page', () => {
        chapterComponentsPage.clickOnCreateButton();
        chapterUpdatePage = new ChapterUpdatePage();
        expect(chapterUpdatePage.getPageTitle()).toMatch(/Create or edit a Chapter/);
        chapterUpdatePage.cancel();
    });

    it('should create and save Chapters', () => {
        chapterComponentsPage.clickOnCreateButton();
        chapterUpdatePage.setNameInput('name');
        expect(chapterUpdatePage.getNameInput()).toMatch('name');
        chapterUpdatePage.setChapterNumberInput('5');
        expect(chapterUpdatePage.getChapterNumberInput()).toMatch('5');
        chapterUpdatePage.setDescriptionInput('description');
        expect(chapterUpdatePage.getDescriptionInput()).toMatch('description');
        chapterUpdatePage.setCourseIDInput('courseID');
        expect(chapterUpdatePage.getCourseIDInput()).toMatch('courseID');
        chapterUpdatePage.save();
        expect(chapterUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
