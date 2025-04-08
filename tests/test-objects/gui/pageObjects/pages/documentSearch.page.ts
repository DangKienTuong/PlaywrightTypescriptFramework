import * as pageActions from '@utilities/ui/page-actions';
import { Locator } from '@playwright/test';

export default class DocumentSearchPage{
    private btnUploadDocument: Locator = pageActions.getLocator('//span[text()="Upload documents"]');
  
    async clickOnUploadDocuments(){
        await pageActions.click(this.btnUploadDocument);
        await pageActions.waitForPageLoadState();
        (await pageActions.getURL()).includes("**/ai-doc-upload**");
    }
   
}