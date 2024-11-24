```markdown
# Users API

Manage users through our REST API.

## Endpoints

### Create User
```bash
POST /api/v1/users

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### Get User
```bash
GET /api/v1/users/:id
```

### Update User
```bash
PATCH /api/v1/users/:id

{
  "name": "John Smith"
}
```

### Delete User
```bash
DELETE /api/v1/users/:id
```

## User Properties

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | User's full name |
| email | string | Email address |
| role | string | User role |
| created | datetime | Creation timestamp |

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | Invalid request |
| 404 | User not found |
| 409 | Email conflict |
```

