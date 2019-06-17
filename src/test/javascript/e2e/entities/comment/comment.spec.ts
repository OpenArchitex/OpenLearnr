/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommentComponentsPage, CommentDeleteDialog, CommentUpdatePage } from './comment.page-object';

const expect = chai.expect;

describe('Comment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentUpdatePage: CommentUpdatePage;
  let commentComponentsPage: CommentComponentsPage;
  let commentDeleteDialog: CommentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Comments', async () => {
    await navBarPage.goToEntity('comment');
    commentComponentsPage = new CommentComponentsPage();
    await browser.wait(ec.visibilityOf(commentComponentsPage.title), 5000);
    expect(await commentComponentsPage.getTitle()).to.eq('Comments');
  });

  it('should load create Comment page', async () => {
    await commentComponentsPage.clickOnCreateButton();
    commentUpdatePage = new CommentUpdatePage();
    expect(await commentUpdatePage.getPageTitle()).to.eq('Create or edit a Comment');
    await commentUpdatePage.cancel();
  });

  it('should create and save Comments', async () => {
    const nbButtonsBeforeCreate = await commentComponentsPage.countDeleteButtons();

    await commentComponentsPage.clickOnCreateButton();
    await promise.all([
      commentUpdatePage.setVideoIDInput('videoID'),
      commentUpdatePage.setCommentBodyInput('commentBody'),
      commentUpdatePage.setLikesCountInput('5'),
      commentUpdatePage.setDislikesCountInput('5')
    ]);
    expect(await commentUpdatePage.getVideoIDInput()).to.eq('videoID', 'Expected VideoID value to be equals to videoID');
    expect(await commentUpdatePage.getCommentBodyInput()).to.eq('commentBody', 'Expected CommentBody value to be equals to commentBody');
    expect(await commentUpdatePage.getLikesCountInput()).to.eq('5', 'Expected likesCount value to be equals to 5');
    expect(await commentUpdatePage.getDislikesCountInput()).to.eq('5', 'Expected dislikesCount value to be equals to 5');
    const selectedIsApproved = commentUpdatePage.getIsApprovedInput();
    if (await selectedIsApproved.isSelected()) {
      await commentUpdatePage.getIsApprovedInput().click();
      expect(await commentUpdatePage.getIsApprovedInput().isSelected(), 'Expected isApproved not to be selected').to.be.false;
    } else {
      await commentUpdatePage.getIsApprovedInput().click();
      expect(await commentUpdatePage.getIsApprovedInput().isSelected(), 'Expected isApproved to be selected').to.be.true;
    }
    await commentUpdatePage.save();
    expect(await commentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await commentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Comment', async () => {
    const nbButtonsBeforeDelete = await commentComponentsPage.countDeleteButtons();
    await commentComponentsPage.clickOnLastDeleteButton();

    commentDeleteDialog = new CommentDeleteDialog();
    expect(await commentDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Comment?');
    await commentDeleteDialog.clickOnConfirmButton();

    expect(await commentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
