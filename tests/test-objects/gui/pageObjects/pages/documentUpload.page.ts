import * as pageActions from '@utilities/ui/page-actions';
import * as assertTest from '@utilities/ui/assert-utils';
import {generateRandomString} from '@utilities/common/string-utils';
import { Locator } from '@playwright/test';
import path from 'path';

export default class DocumentUploadPage{
    private lbBrowserFiles: Locator = pageActions.getLocator('//div[@class="a-file-upload-action-btn"]/label');
    private lbUploadedFile: Locator = pageActions.getLocator('//div[@class="file-name"]');
    private fieldPartNumber: Locator = pageActions.getLocator('#partNumber');
    private selDocumentType: Locator = pageActions.getLocator('#documentType');
    private selProductGroup: Locator = pageActions.getLocator('#productGroup');
    private fieldTag: Locator = pageActions.getLocator('#tag-input');
    private btnUpload: Locator = pageActions.getLocator('//button//span[text()="Upload"]');
    private lbTagsDisplay: Locator = pageActions.getLocator('//div[@class="tag-display-area"]//span[@id="chip-label-id-close-button"]');
    

    async attachFilesToUploadDocumentForm(filesPath: string[]){
        let listUploadedFileNames: string[] = [];
        filesPath.forEach(filePath => {
            listUploadedFileNames.push(path.basename(filePath));
        });
        await pageActions.attachFilesToFileChooser(this.lbBrowserFiles, filesPath);
        await assertTest.expectElementsToContainsValues(this.lbUploadedFile, listUploadedFileNames);
    }

    async fillPartNumber(partNumber: string){
        await pageActions.fill(this.fieldPartNumber, partNumber);
    }

    async selectDocumentType(documentTypeValue: string){
        await pageActions.selectByValue(this.selDocumentType, documentTypeValue);
    }

    async selectProductGroup(productGroupValue: string){
        await pageActions.selectByValue(this.selProductGroup, productGroupValue);
    }

    async inputTag(tag: string){
        await pageActions.fillAndEnter(this.fieldTag, tag);
        await pageActions.waitForSomeTime(1000);
    }

    async clickUploadDocument(){
        await pageActions.click(this.btnUpload);
    }

    async fillRandomPartNumber(){
        let randomPartNumber: string = `PartNo_${generateRandomString(5)}`;
        await this.fillPartNumber(randomPartNumber);
    }

    async inputRandomTags(noOfTags: number = 1){
        let inputtedTags: string[] = [];
        for(let index = 0; index < noOfTags; index++){
            let inputTagValue: string = `TestTag_${generateRandomString(4)}`;
            inputtedTags.push(inputTagValue);
            await this.inputTag(inputTagValue);
        }
        return inputtedTags;
    }

    async verifyInputtedTagsAreDisplayed(inputtedTags: string | Array<string>){
        await assertTest.expectElementToContainText(this.lbTagsDisplay, inputtedTags);
    }
}