import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ChapterComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-chapter div table .btn-danger'));
  title = element.all(by.css('jhi-chapter div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class ChapterUpdatePage {
  pageTitle = element(by.id('jhi-chapter-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  chapterNumberInput = element(by.id('field_chapterNumber'));
  descriptionInput = element(by.id('field_description'));
  courseIDInput = element(by.id('field_courseID'));
  isPaidChapterInput = element(by.id('field_isPaidChapter'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setChapterNumberInput(chapterNumber) {
    await this.chapterNumberInput.sendKeys(chapterNumber);
  }

  async getChapterNumberInput() {
    return await this.chapterNumberInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setCourseIDInput(courseID) {
    await this.courseIDInput.sendKeys(courseID);
  }

  async getCourseIDInput() {
    return await this.courseIDInput.getAttribute('value');
  }

  getIsPaidChapterInput() {
    return this.isPaidChapterInput;
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ChapterDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-chapter-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-chapter'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
