import { element, by, promise, ElementFinder } from 'protractor';

export class ChapterComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-chapter div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
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

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setChapterNumberInput(chapterNumber): promise.Promise<void> {
        return this.chapterNumberInput.sendKeys(chapterNumber);
    }

    getChapterNumberInput() {
        return this.chapterNumberInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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
