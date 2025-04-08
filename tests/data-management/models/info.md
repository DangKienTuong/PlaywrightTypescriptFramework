## Data Models

Data models define the structure of objects or data expected in the test. They ensure consistency when interacting with API responses, UI inputs, and other data sources.

### Example: User Model

```ts
// tests/data-management/models/userModel.ts

export interface User {
  userId: number;
  userName: string;
  email: string;
  password: string;
}
```