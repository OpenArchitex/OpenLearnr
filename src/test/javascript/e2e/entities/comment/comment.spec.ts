import { browser } from 'protractor';
import { NavBarPage } from '../../page-objects/jhi-page-objects';
import { CommentComponentsPage, CommentUpdatePage } from './comment.page-object';

describe('Comment e2e test', () => {
    let navBarPage: NavBarPage;
    let commentUpdatePage: CommentUpdatePage;
    let commentComponentsPage: CommentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comments', () => {
        navBarPage.goToEntity('comment');
        commentComponentsPage = new CommentComponentsPage();
        expect(commentComponentsPage.getTitle()).toMatch(/Comments/);
    });

    it('should load create Comment page', () => {
        commentComponentsPage.clickOnCreateButton();
        commentUpdatePage = new CommentUpdatePage();
        expect(commentUpdatePage.getPageTitle()).toMatch(/Create or edit a Comment/);
        commentUpdatePage.cancel();
    });

    it('should create and save Comments', () => {
        commentComponentsPage.clickOnCreateButton();
        commentUpdatePage.setVideoIDInput('videoID');
        expect(commentUpdatePage.getVideoIDInput()).toMatch('videoID');
        commentUpdatePage.setCommentBodyInput('commentBody');
        expect(commentUpdatePage.getCommentBodyInput()).toMatch('commentBody');
        commentUpdatePage.setLikesCountInput('5');
        expect(commentUpdatePage.getLikesCountInput()).toMatch('5');
        commentUpdatePage.setDislikesCountInput('5');
        expect(commentUpdatePage.getDislikesCountInput()).toMatch('5');
        commentUpdatePage
            .getIsApprovedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    commentUpdatePage.getIsApprovedInput().click();
                    expect(commentUpdatePage.getIsApprovedInput().isSelected()).toBeFalsy();
                } else {
                    commentUpdatePage.getIsApprovedInput().click();
                    expect(commentUpdatePage.getIsApprovedInput().isSelected()).toBeTruthy();
                }
            });
        commentUpdatePage.save();
        expect(commentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
