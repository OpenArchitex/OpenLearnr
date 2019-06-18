import { element, by, ElementFinder } from 'protractor';

export class VideoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-video div table .btn-danger'));
  title = element.all(by.css('jhi-video div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class VideoUpdatePage {
  pageTitle = element(by.id('jhi-video-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  episodeInput = element(by.id('field_episode'));
  descriptionInput = element(by.id('field_description'));
  urlInput = element(by.id('field_url'));
  courseIDInput = element(by.id('field_courseID'));
  chapterIDInput = element(by.id('field_chapterID'));
  isSampleInput = element(by.id('field_isSample'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setEpisodeInput(episode) {
    await this.episodeInput.sendKeys(episode);
  }

  async getEpisodeInput() {
    return await this.episodeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return await this.urlInput.getAttribute('value');
  }

  async setCourseIDInput(courseID) {
    await this.courseIDInput.sendKeys(courseID);
  }

  async getCourseIDInput() {
    return await this.courseIDInput.getAttribute('value');
  }

  async setChapterIDInput(chapterID) {
    await this.chapterIDInput.sendKeys(chapterID);
  }

  async getChapterIDInput() {
    return await this.chapterIDInput.getAttribute('value');
  }

  getIsSampleInput(timeout?: number) {
    return this.isSampleInput;
  }
  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class VideoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-video-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-video'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
