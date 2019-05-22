import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { VideoComponentsPage, VideoUpdatePage } from './video.page-object';

describe('Video e2e test', () => {
    let navBarPage: NavBarPage;
    let videoUpdatePage: VideoUpdatePage;
    let videoComponentsPage: VideoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Videos', () => {
        navBarPage.goToEntity('video');
        videoComponentsPage = new VideoComponentsPage();
        expect(videoComponentsPage.getTitle()).toMatch(/Videos/);
    });

    it('should load create Video page', () => {
        videoComponentsPage.clickOnCreateButton();
        videoUpdatePage = new VideoUpdatePage();
        expect(videoUpdatePage.getPageTitle()).toMatch(/Create or edit a Video/);
        videoUpdatePage.cancel();
    });

    it('should create and save Videos', () => {
        videoComponentsPage.clickOnCreateButton();
        videoUpdatePage.setNameInput('name');
        expect(videoUpdatePage.getNameInput()).toMatch('name');
        videoUpdatePage.setEpisodeInput('5');
        expect(videoUpdatePage.getEpisodeInput()).toMatch('5');
        videoUpdatePage.setDescriptionInput('description');
        expect(videoUpdatePage.getDescriptionInput()).toMatch('description');
        videoUpdatePage.setUrlInput('url');
        expect(videoUpdatePage.getUrlInput()).toMatch('url');
        videoUpdatePage.setCourseIDInput('courseID');
        expect(videoUpdatePage.getCourseIDInput()).toMatch('courseID');
        videoUpdatePage.save();
        expect(videoUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
