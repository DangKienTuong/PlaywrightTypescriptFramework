import * as pageActions from '@utilities/ui/page-actions';
import * as assertTest from '@utilities/ui/assert-utils';
import { Locator } from '@playwright/test';

export default class UserGroupPage {
    private btnCreateUserGroup: Locator = pageActions.getLocatorByTitle('Create User Group');
    private fieldUserGroupName: Locator = pageActions.getLocator('//div[@id="frok-modal"]//input[@formcontrolname="name"]');
    private btnSubmitCreateUserGroup: Locator = pageActions.getLocator('//div[@id="frok-modal"]//button/span[text()="Submit"]');
    private fieldSearchUserGroup: Locator = pageActions.getLocator('//div[@class="search-box-container"]//input');
    private lcCellUserGroupName= (groupName: string) => `//tbody//td[contains(text(), "${groupName}")]`;
    private btnEditActionOfTargetGroup =  (groupName: string) => `//tbody//td[contains(text(), "${groupName}")]/..//button[@aria-label="Edit"]`;
    private btnDeleteActionOfTargetGroup =  (groupName: string) => `//tbody//td[contains(text(), "${groupName}")]/..//button[@aria-label="Delete"]`;
    private btnConfirmDeletingGroup: Locator = pageActions.getLocator('//div[@class="m-dialog__actions"]//span[text()="Confirm"]');
    private fieldDocumentTagInUserGroup: Locator = pageActions.getLocator('#tag-input');
    private lcAvailableTagsInUserGroup: string = '//div[@class="tag-area"]//ul[@class="search-result"]/li';
    private lcTargetSelectTag =  (tagName: string) =>  `//div[@class="tag-area"]//ul[@class="search-result"]/li[contains(text(),"${tagName}")]`;
    private btnSaveEditUserGroup: Locator = pageActions.getLocator('//div[@class="m-dialog__actions"]//button[@data-frok-action="confirm"]');
    private lcListDisplayedTagOfUserGroup =  (groupName: string) => `//tbody//td[contains(text(), "${groupName}")]/..//div[@class="a-chip"]/span[@id="chip-label-id-default"]`;
    private lcLabelMoreTagOfUserGroup =  (groupName: string) => `//tbody//td[contains(text(), "${groupName}")]/..//div[@class="a-chip"]/span[@id="chip-label-id-more"]`;

    async createNewUserGroup(userGroupName: string){
        await pageActions.click(this.btnCreateUserGroup);
        await pageActions.fill(this.fieldUserGroupName, userGroupName);
        await pageActions.click(this.btnSubmitCreateUserGroup);
    }

    async filterUserGroupList(searchValue: string){
        await pageActions.fillAndEnter(this.fieldSearchUserGroup, searchValue);
    }

    async verifyCreatedGroupDisplayInlist(createGroupName: string){
        let elCreatedGroupNameInList: Locator = pageActions.getLocator(this.lcCellUserGroupName(createGroupName));
        await assertTest.expectElementToBeVisible(elCreatedGroupNameInList);
    }

    async selectEditForUserGroup(userGroupName: string){
        let elEditActionOfGroup: Locator = pageActions.getLocator(this.btnEditActionOfTargetGroup(userGroupName));
        await pageActions.click(elEditActionOfGroup);
    }

    async selectNewTagsToUserGroup(noOfTags: number = 1){
        let selectedTagsValue: string[] = [];
        for(let iter=0; iter < noOfTags; iter++){
            await pageActions.click(this.fieldDocumentTagInUserGroup);
            let listAvailableTags: Locator = pageActions.getLocator(this.lcAvailableTagsInUserGroup)
            let availableTags: string[] = await pageActions.getAllTexts(listAvailableTags);
            if(availableTags.length > 0){
                let elTagToSelect: Locator = pageActions.getLocator(this.lcTargetSelectTag(availableTags[0]));
                await pageActions.click(elTagToSelect);
                selectedTagsValue.push(availableTags[0]); 
            }
        }
        await pageActions.click(this.btnSaveEditUserGroup);
        return selectedTagsValue;
    }

    async selectDeleteTargetUserGroup(userGroupName: string){
        let elDeleteActionOfGroup: Locator = pageActions.getLocator(this.btnDeleteActionOfTargetGroup(userGroupName));
        await pageActions.click(elDeleteActionOfGroup);
        await pageActions.click(this.btnConfirmDeletingGroup);
    }

    async verifyDisplayingTagsOfUserGroup(userGroupName: string, listTags: Array<string>){
        await pageActions.waitForSomeTime(2000);
        let displayingTags = pageActions.getLocator(this.lcListDisplayedTagOfUserGroup(userGroupName));
        assertTest.expectElementsToContainsValues(displayingTags, listTags);
    }
}