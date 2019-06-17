/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VideoComponentsPage, VideoDeleteDialog, VideoUpdatePage } from './video.page-object';

const expect = chai.expect;

describe('Video e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let videoUpdatePage: VideoUpdatePage;
  let videoComponentsPage: VideoComponentsPage;
  let videoDeleteDialog: VideoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Videos', async () => {
    await navBarPage.goToEntity('video');
    videoComponentsPage = new VideoComponentsPage();
    await browser.wait(ec.visibilityOf(videoComponentsPage.title), 5000);
    expect(await videoComponentsPage.getTitle()).to.eq('Videos');
  });

  it('should load create Video page', async () => {
    await videoComponentsPage.clickOnCreateButton();
    videoUpdatePage = new VideoUpdatePage();
    expect(await videoUpdatePage.getPageTitle()).to.eq('Create or edit a Video');
    await videoUpdatePage.cancel();
  });

  it('should create and save Videos', async () => {
    const nbButtonsBeforeCreate = await videoComponentsPage.countDeleteButtons();

    await videoComponentsPage.clickOnCreateButton();
    await promise.all([
      videoUpdatePage.setNameInput('name'),
      videoUpdatePage.setEpisodeInput('5'),
      videoUpdatePage.setDescriptionInput('description'),
      videoUpdatePage.setUrlInput('url'),
      videoUpdatePage.setCourseIDInput('courseID'),
      videoUpdatePage.setChapterIDInput('chapterID')
    ]);
    expect(await videoUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await videoUpdatePage.getEpisodeInput()).to.eq('5', 'Expected episode value to be equals to 5');
    expect(await videoUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await videoUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    expect(await videoUpdatePage.getCourseIDInput()).to.eq('courseID', 'Expected CourseID value to be equals to courseID');
    expect(await videoUpdatePage.getChapterIDInput()).to.eq('chapterID', 'Expected ChapterID value to be equals to chapterID');
    const selectedIsSample = videoUpdatePage.getIsSampleInput();
    if (await selectedIsSample.isSelected()) {
      await videoUpdatePage.getIsSampleInput().click();
      expect(await videoUpdatePage.getIsSampleInput().isSelected(), 'Expected isSample not to be selected').to.be.false;
    } else {
      await videoUpdatePage.getIsSampleInput().click();
      expect(await videoUpdatePage.getIsSampleInput().isSelected(), 'Expected isSample to be selected').to.be.true;
    }
    await videoUpdatePage.save();
    expect(await videoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await videoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Video', async () => {
    const nbButtonsBeforeDelete = await videoComponentsPage.countDeleteButtons();
    await videoComponentsPage.clickOnLastDeleteButton();

    videoDeleteDialog = new VideoDeleteDialog();
    expect(await videoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Video?');
    await videoDeleteDialog.clickOnConfirmButton();

    expect(await videoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
