import { test} from "@playwright/test";
import {expect} from '@utilities/reporter/custom-expect'
import { ConfigHelper } from "@utilities/api/api-config";
import { createtApiContext } from "@utilities/api/api-helper";
import FakeApiHelper from "tests/test-objects/api/helpers/fakeApiHelper";
import { User, UserCrendetial } from "tests/test-objects/api/models/userModel";
import { logger } from "@utilities/reporter/custom-logger";

test.describe('Fake API Helper Tests', () => {
  
  let apiHelper: FakeApiHelper;
  test.beforeEach(async  () => {
    const configHelper = new ConfigHelper();
    await createtApiContext(configHelper.getBaseUrl());
    apiHelper = new FakeApiHelper();
  });
  
  test('should fetch user data successfully', async () => {
    const userId = 1;
    const user: User = await apiHelper.fetchUser(userId);  
    expect(user).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.address).toBeDefined();
    expect(user.zip).toBeDefined();
    expect(user.state).toBeDefined();
    expect(user.country).toBeDefined();
    expect(user.phone).toBeDefined();
    expect(user.photo).toBeDefined();
    expect(user.id).toBe(1);
  });

  test('should allow user login successfully', async() =>{
    const user: UserCrendetial = {
      username: "michael",
      password: "success-password"
    }
    let responseApi = await apiHelper.loginWithUserCredential(user);
    expect(responseApi.message).toHaveText("Login successful");
    logger.info(responseApi);

  });

});

