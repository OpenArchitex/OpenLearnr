import { element, by, promise, ElementFinder } from 'protractor';

export class StudentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-student div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class StudentUpdatePage {
    pageTitle = element(by.id('jhi-student-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userIDInput = element(by.id('field_userID'));
    lastWatchedVideoInput = element(by.id('field_lastWatchedVideo'));
    lastWatchedVideoTimeInput = element(by.id('field_lastWatchedVideoTime'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setUserIDInput(userID): promise.Promise<void> {
        return this.userIDInput.sendKeys(userID);
    }

    getUserIDInput() {
        return this.userIDInput.getAttribute('value');
    }

    setLastWatchedVideoInput(lastWatchedVideo): promise.Promise<void> {
        return this.lastWatchedVideoInput.sendKeys(lastWatchedVideo);
    }

    getLastWatchedVideoInput() {
        return this.lastWatchedVideoInput.getAttribute('value');
    }

    setLastWatchedVideoTimeInput(lastWatchedVideoTime): promise.Promise<void> {
        return this.lastWatchedVideoTimeInput.sendKeys(lastWatchedVideoTime);
    }

    getLastWatchedVideoTimeInput() {
        return this.lastWatchedVideoTimeInput.getAttribute('value');
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
