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
    lastWatchedVideoIDInput = element(by.id('field_lastWatchedVideoID'));
    lastWatchedVideoTimeInput = element(by.id('field_lastWatchedVideoTime'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setLastWatchedVideoIDInput(lastWatchedVideoID): promise.Promise<void> {
        return this.lastWatchedVideoIDInput.sendKeys(lastWatchedVideoID);
    }

    getLastWatchedVideoIDInput() {
        return this.lastWatchedVideoIDInput.getAttribute('value');
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
