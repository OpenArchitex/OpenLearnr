import { element, by, promise, ElementFinder } from 'protractor';

export class CommentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-comment div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
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

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setVideoIDInput(videoID): promise.Promise<void> {
        return this.videoIDInput.sendKeys(videoID);
    }

    getVideoIDInput() {
        return this.videoIDInput.getAttribute('value');
    }

    setCommentBodyInput(commentBody): promise.Promise<void> {
        return this.commentBodyInput.sendKeys(commentBody);
    }

    getCommentBodyInput() {
        return this.commentBodyInput.getAttribute('value');
    }

    setLikesCountInput(likesCount): promise.Promise<void> {
        return this.likesCountInput.sendKeys(likesCount);
    }

    getLikesCountInput() {
        return this.likesCountInput.getAttribute('value');
    }

    setDislikesCountInput(dislikesCount): promise.Promise<void> {
        return this.dislikesCountInput.sendKeys(dislikesCount);
    }

    getDislikesCountInput() {
        return this.dislikesCountInput.getAttribute('value');
    }

    getIsApprovedInput() {
        return this.isApprovedInput;
    }
    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
