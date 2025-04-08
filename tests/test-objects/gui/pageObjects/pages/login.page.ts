import * as pageActions from '@utilities/ui/page-actions';

export default class LoginPage{
    private btnLoginBoschAccount = pageActions.getLocator('//div[contains(text(), "Login with Bosch Account")]');
    private inputEmail = pageActions.getLocator('//input[@type="email"]');
    private btnNext = pageActions.getLocator('//input[@value="Next"]');

    async openServiceDashboardPage(url: string){
        await pageActions.gotoURL(url);
    }
    
    async loginToDashboardByBoschAccount(username: string, storagePath?: string){
        await pageActions.click(this.btnLoginBoschAccount);
        await pageActions.fill(this.inputEmail,username);
        await pageActions.click(this.btnNext);
        await pageActions.saveStorageState(storagePath);
        
    }
}
