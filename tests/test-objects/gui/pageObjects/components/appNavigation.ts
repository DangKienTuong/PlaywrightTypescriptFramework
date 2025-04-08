import { type Locator } from "@playwright/test";
import * as pageActions from '@utilities/ui/page-actions';

export enum NavMenuItem {
    Home = "Home",
    DocumentSearch = "Document Search",
    DocumentUpload = "Document Upload",
    Users = "Users",
    UserGroup = "User Groups",
    ApiKey = "API Keys",
}

export default class AppNavigationBar {
    private btnOpenNavBar: Locator = pageActions.getLocatorByRole('button').getByLabel('Open Side Navigation');
    private btnCloseNavBar: Locator = pageActions.getLocatorByRole('button').getByLabel('Close Side Navigation');
    private btnOnNavBar = (btnLabel: string): Locator => pageActions.getLocatorByTitle(`${btnLabel}`);;

    async accessMenuOnNavBar(menuItem: NavMenuItem) {
        await pageActions.click(this.btnOnNavBar(menuItem));
    }
}