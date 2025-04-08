
## Data Mapping Helpers

Data mapping helpers are functions that manipulate or transform data as needed. These functions help convert data from one format to another, or format raw data to match the model structure.

### Example: Map API Response to User Model

```ts
// tests/data-management/handlers/mapApiToUser.ts

import { User } from '../models/userModel';

export function mapApiResponseToUser(apiResponse: any): User {
  return {
    userId: apiResponse.id,
    userName: apiResponse.name,
    email: apiResponse.email,
    password: apiResponse.passwordHash,
  };
}

```