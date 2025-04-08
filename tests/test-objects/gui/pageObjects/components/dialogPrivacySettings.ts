import { type Locator } from "@playwright/test";
import * as pageActions from '@utilities/ui/page-actions';
import * as assertTest from '@utilities/ui/assert-utils';

export default class PrivacySettingsDialog{

  private locDialogPrivacySetting: string = "#save-all-modal-dialog"; 
  private locBtnAcceptAllPrivacy: string = "#save-all-modal-dialog .a-button--primary"; 

  async acceptAllPrivacySetting() {
    let dgPrivacySetting: Locator = pageActions.getLocator(this.locDialogPrivacySetting);
    await assertTest.expectElementToBeVisible(dgPrivacySetting);
    await pageActions.click(pageActions.getLocator(this.locBtnAcceptAllPrivacy));
  }
}