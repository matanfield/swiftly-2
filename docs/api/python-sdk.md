```markdown
# Python SDK

Complete guide to using our Python SDK.

## Installation

```bash
pip install platform-sdk
```

## Initialization

```python
from platform_sdk import Platform

platform = Platform(
    api_key='your_api_key',
    environment='production'
)
```

## Core Methods

### Users
```python
# Create user
user = platform.users.create(
    name='John Doe',
    email='john@example.com'
)

# Get user
user = platform.users.get('user_id')

# Update user
platform.users.update('user_id', 
    name='John Smith'
)
```

### Products
```python
# List products
products = platform.products.list(
    category='electronics',
    limit=10
)

# Create product
product = platform.products.create(
    name='Premium Widget',
    price=99.99
)
```

## Error Handling
```python
try:
    platform.users.create(user_data)
except ValidationError as e:
    print(f'Invalid data: {e.details}')
except APIError as e:
    print(f'API error: {e.message}')
```
```

