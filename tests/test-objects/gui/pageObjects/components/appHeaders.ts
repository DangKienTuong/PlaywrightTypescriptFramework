import { type Locator } from "@playwright/test";
import * as pageActions from '@utilities/ui/page-actions';
import * as assertTest from '@utilities/ui/assert-utils';


export default class AppHeaders {
    private locPageTitle: Locator = pageActions.getLocator('//div[contains(@class, "header__title")]');
    private btnUserMenu: Locator = pageActions.getLocator('//header[contains(@class, "o-minimal-header")]//em[@title="User menu icon"]');
    private menuSubscriptions: Locator = pageActions.getLocator('//a[@role="menuitem"]//span[text()="Subscriptions"]');
    private lbSubscription = (subsName: string) => `//span[contains(text(), "${subsName}")]`;

    async validatePageTitle(expectedTitle: string) {
        await assertTest.expectElementToContainText(this.locPageTitle, expectedTitle);
    }

    async selectAppSubscriptionFromHeader(subscriptionName: string) {
        await pageActions.click(this.btnUserMenu);
        await pageActions.hover(this.menuSubscriptions);
        let menuSubscriptionToSelect =  pageActions.getLocator(this.lbSubscription(subscriptionName));
        await pageActions.click(menuSubscriptionToSelect);
    }
}
