import { element, by, promise, ElementFinder } from 'protractor';

export class VideoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-video div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class VideoUpdatePage {
    pageTitle = element(by.id('jhi-video-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    episodeInput = element(by.id('field_episode'));
    urlInput = element(by.id('field_url'));
    courseIDInput = element(by.id('field_courseID'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setEpisodeInput(episode): promise.Promise<void> {
        return this.episodeInput.sendKeys(episode);
    }

    getEpisodeInput() {
        return this.episodeInput.getAttribute('value');
    }

    setUrlInput(url): promise.Promise<void> {
        return this.urlInput.sendKeys(url);
    }

    getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    setCourseIDInput(courseID): promise.Promise<void> {
        return this.courseIDInput.sendKeys(courseID);
    }

    getCourseIDInput() {
        return this.courseIDInput.getAttribute('value');
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
