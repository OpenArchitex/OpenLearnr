import { element, by, ElementFinder } from 'protractor';

export class CommentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-comment div table .btn-danger'));
  title = element.all(by.css('jhi-comment div h2#page-heading span')).first();

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

export class CommentUpdatePage {
  pageTitle = element(by.id('jhi-comment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  videoIDInput = element(by.id('field_videoID'));
  commentBodyInput = element(by.id('field_commentBody'));
  likesCountInput = element(by.id('field_likesCount'));
  dislikesCountInput = element(by.id('field_dislikesCount'));
  isApprovedInput = element(by.id('field_isApproved'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setVideoIDInput(videoID) {
    await this.videoIDInput.sendKeys(videoID);
  }

  async getVideoIDInput() {
    return await this.videoIDInput.getAttribute('value');
  }

  async setCommentBodyInput(commentBody) {
    await this.commentBodyInput.sendKeys(commentBody);
  }

  async getCommentBodyInput() {
    return await this.commentBodyInput.getAttribute('value');
  }

  async setLikesCountInput(likesCount) {
    await this.likesCountInput.sendKeys(likesCount);
  }

  async getLikesCountInput() {
    return await this.likesCountInput.getAttribute('value');
  }

  async setDislikesCountInput(dislikesCount) {
    await this.dislikesCountInput.sendKeys(dislikesCount);
  }

  async getDislikesCountInput() {
    return await this.dislikesCountInput.getAttribute('value');
  }

  getIsApprovedInput(timeout?: number) {
    return this.isApprovedInput;
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

export class CommentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-comment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-comment'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
