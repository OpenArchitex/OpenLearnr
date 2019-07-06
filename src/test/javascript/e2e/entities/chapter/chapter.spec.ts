/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChapterComponentsPage, ChapterDeleteDialog, ChapterUpdatePage } from './chapter.page-object';

const expect = chai.expect;

describe('Chapter e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chapterUpdatePage: ChapterUpdatePage;
  let chapterComponentsPage: ChapterComponentsPage;
  let chapterDeleteDialog: ChapterDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Chapters', async () => {
    await navBarPage.goToEntity('chapter');
    chapterComponentsPage = new ChapterComponentsPage();
    await browser.wait(ec.visibilityOf(chapterComponentsPage.title), 5000);
    expect(await chapterComponentsPage.getTitle()).to.eq('Chapters');
  });

  it('should load create Chapter page', async () => {
    await chapterComponentsPage.clickOnCreateButton();
    chapterUpdatePage = new ChapterUpdatePage();
    expect(await chapterUpdatePage.getPageTitle()).to.eq('Create or edit a Chapter');
    await chapterUpdatePage.cancel();
  });

  it('should create and save Chapters', async () => {
    const nbButtonsBeforeCreate = await chapterComponentsPage.countDeleteButtons();

    await chapterComponentsPage.clickOnCreateButton();
    await promise.all([
      chapterUpdatePage.setNameInput('name'),
      chapterUpdatePage.setChapterNumberInput('5'),
      chapterUpdatePage.setDescriptionInput('description'),
      chapterUpdatePage.setCourseIDInput('courseID')
    ]);
    expect(await chapterUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await chapterUpdatePage.getChapterNumberInput()).to.eq('5', 'Expected chapterNumber value to be equals to 5');
    expect(await chapterUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await chapterUpdatePage.getCourseIDInput()).to.eq('courseID', 'Expected CourseID value to be equals to courseID');
    const selectedIsPaidChapter = chapterUpdatePage.getIsPaidChapterInput();
    if (await selectedIsPaidChapter.isSelected()) {
      await chapterUpdatePage.getIsPaidChapterInput().click();
      expect(await chapterUpdatePage.getIsPaidChapterInput().isSelected(), 'Expected isPaidChapter not to be selected').to.be.false;
    } else {
      await chapterUpdatePage.getIsPaidChapterInput().click();
      expect(await chapterUpdatePage.getIsPaidChapterInput().isSelected(), 'Expected isPaidChapter to be selected').to.be.true;
    }
    await chapterUpdatePage.save();
    expect(await chapterUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await chapterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Chapter', async () => {
    const nbButtonsBeforeDelete = await chapterComponentsPage.countDeleteButtons();
    await chapterComponentsPage.clickOnLastDeleteButton();

    chapterDeleteDialog = new ChapterDeleteDialog();
    expect(await chapterDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Chapter?');
    await chapterDeleteDialog.clickOnConfirmButton();

    expect(await chapterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
