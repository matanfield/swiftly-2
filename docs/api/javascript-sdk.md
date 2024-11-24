```markdown
# JavaScript SDK

Complete guide to using our JavaScript SDK.

## Installation

```bash
npm install @platform/sdk
# or
yarn add @platform/sdk
```

## Initialization

```javascript
import { Platform } from '@platform/sdk'

const platform = new Platform({
  apiKey: 'your_api_key',
  environment: 'production'
})
```

## Core Methods

### Users
```javascript
// Create user
const user = await platform.users.create({
  name: 'John Doe',
  email: 'john@example.com'
})

// Get user
const user = await platform.users.get('user_id')

// Update user
await platform.users.update('user_id', {
  name: 'John Smith'
})
```

### Products
```javascript
// List products
const products = await platform.products.list({
  category: 'electronics',
  limit: 10
})

// Create product
const product = await platform.products.create({
  name: 'Premium Widget',
  price: 99.99
})
```

## Error Handling
```javascript
try {
  await platform.users.create(userData)
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    console.error('Invalid data:', error.details)
  }
}
```
```

