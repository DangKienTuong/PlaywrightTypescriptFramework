import { test } from '@pageobjects/pageFixture';
import { NavMenuItem } from '@pageobjects/components/appNavigation';
import { decryptFromBase64, generateRandomString } from '@utilities/common/string-utils';
import * as cred from 'tests/test-data/user-data/credentials.json';

const authFile = '.auth/userAdmin.json';
const documentFolder = "tests/test-data/document-files/";
const pageUrl = process.env.BASE_URL;
const typedCred = cred as Record<string, any>;
const environment = process.env.NODE_ENV || 'dev';
const creAdminUserName: string = typedCred[environment].servicedashboard["au-documentsearch"].admin.username;
const creAdminADUserName: string = typedCred[environment].servicedashboard["au-documentsearch"].admin["ad-username"];
const creAdminPassword: string = decryptFromBase64(cred.dev.servicedashboard["au-documentsearch"].admin.password) as string;

/**
    * @owner hqp1hc
    * @story_id 155
    * @description US-155 [link](https://dev.azure.com/EA-Sq7-Oceania/MA-Doc-Search/_workitems/edit/155)
**/
test.describe("MA Doc Search Functionalities check", () => {
    test.use({
        httpCredentials: {
            username: creAdminUserName,
            password: creAdminPassword,
        }
    })
    // @title Logon to Bosch Digital Service Dashboard and Access Document AI Search - Australia
    test.beforeEach(async ({ loginPage, compDialogPrivacySettings, appHeader }) => {
        await test.step('accept privacy setting and login to service dashboard', async () => {
            await loginPage.openServiceDashboardPage(pageUrl as string);
            await compDialogPrivacySettings.acceptAllPrivacySetting();
            await appHeader.validatePageTitle("Bosch Digital Service Dashboard");
            await loginPage.loginToDashboardByBoschAccount(creAdminADUserName, authFile);
        });

        await test.step('Access to Document AI Search and Upload Document', async () => {
            await appHeader.selectAppSubscriptionFromHeader("Document AI Search - Australia");
        });
    });

    /**
     * @description Verify that [Admin] can input tags when uploading Document
     <ol>
        <li>Access and logon to Service Dashboard</li>
        <li>Access to Document AI Search - Australia subscription</li>
        <li>Navigate to Upload Document page</li>
        <li>Upload document with all mandatory fields and tags</li>
        <li>Verify the inputted tags of Documents</li>
     </ol>
     * @test_id 155_req001
    **/
    test("verify that [admin] can input tags when uploading document", { tag: ['@ma-doc-search', '@admin', '@Positive'] },
        async ({ documentUploadPage, documentSearchPage }) => {
            let uploadFile1 = `${documentFolder}/pdfDocument1.pdf`;
            let uploadFile2 = `${documentFolder}/pdfDocument2.pdf`;
            let inputtedTags: string[];

            await test.step('Navigate to Upload Document Page and Fill the mandatory fields', async () => {
                await documentSearchPage.clickOnUploadDocuments();
                await documentUploadPage.attachFilesToUploadDocumentForm([uploadFile1, uploadFile2]);
                await documentUploadPage.fillRandomPartNumber();
                await documentUploadPage.selectDocumentType("Test data");
                await documentUploadPage.selectProductGroup("ABS");
                inputtedTags = await documentUploadPage.inputRandomTags(2);
            });

            await test.step('Verify inputted Tags and Upload Documents', async () => {
                await documentUploadPage.verifyInputtedTagsAreDisplayed(inputtedTags);
                await documentUploadPage.clickUploadDocument();
            });
        });

    /**
     * @description Verify that [Admin] can Create [User Group] then edit to assigned tags to [User Group]
     <ol>
        <li>Access and logon to Service Dashboard</li>
        <li>Access to Document AI Search - Australia subscription</li>
        <li>Navigate to User Group Page via Navigation side bar</li>
        <li>Create new User Group without tags</li>
        <li>Verify that the new User group is displayed by Searching</li>
        <li>Select Edit new created User Group</li>
        <li>Add New tags by selecting in list available tags at Editing User Group dialog</li>
        <li>Save the editing</li>
        <li>Verify the added tags are shown in edited User Group</li>
        <li>Delete created (in-test) User Group for cleaning up test data</li>
     </ol>
     * @test_id 155_req004
    **/
    test("Verify that [Admin] can Create [User Group] then edit to assigned tags to [User Group]", { tag: ['@ma-doc-search', '@admin', '@Positive', '@debug'] },
        async ({ appNavBar, userGroupPage, documentSearchPage }) => {
            let userGroupName: string = `AT_Group_${generateRandomString(8)}`
            let selectedTags: string[];
            await test.step('Navigate to User Group page', async () => {
                // Bypass the loading subscription delay
                await documentSearchPage.clickOnUploadDocuments();
                await appNavBar.accessMenuOnNavBar(NavMenuItem.UserGroup);
            });

            await test.step('Create new User Group', async () => {
                await userGroupPage.createNewUserGroup(userGroupName);
                await userGroupPage.filterUserGroupList(userGroupName);
                await userGroupPage.verifyCreatedGroupDisplayInlist(userGroupName);
            });

            await test.step('Add/Edit tags for User Group', async () => {
                await userGroupPage.selectEditForUserGroup(userGroupName);
                selectedTags = await userGroupPage.selectNewTagsToUserGroup(2);
            });

            await test.step('Verify added/editted tags are shown in User Group List', async () => {
                await userGroupPage.verifyDisplayingTagsOfUserGroup(userGroupName, selectedTags);
            });

            await test.step('Delete created User Group for cleaning test data', async () => {
                await userGroupPage.selectDeleteTargetUserGroup(userGroupName);
            });
        });
});