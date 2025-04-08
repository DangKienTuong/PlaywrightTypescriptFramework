import { apiRequest, HttpMethod, RequestOptions } from '@utilities/api/api-helper';
import { User, UserCrendetial } from '../models/userModel';
import { ContentType } from '@utilities/api/content-types'

export default class FakeApiHelper {

  async fetchUser(userId: number = 1): Promise<User> {
    const headers = {
      'Content-Type': ContentType.APPLICATION_JSON,
    };

    const options: RequestOptions = {
      endpoint: `/users/${userId}`,
      method: HttpMethod.GET,
      headers: headers,
    };

    return (await apiRequest(options)).json();
  };

  async loginWithUserCredential(user: UserCrendetial) {
    const headers = {
      'Content-Type': ContentType.APPLICATION_JSON,
    };

    const options: RequestOptions = {
      endpoint: `/login`,
      method: HttpMethod.POST,
      headers: headers,
      body: {
        "username": user.username,
        "password": user.password
      }
    };

    return (await apiRequest(options)).json();
  };
}