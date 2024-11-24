```markdown
# Authentication API

Learn how to authenticate your requests to our API.

## API Keys

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/resources
```

## OAuth 2.0 Flow

1. Redirect users to:
```
https://auth.example.com/oauth/authorize
```

2. Receive callback with code:
```javascript
const response = await oauth.getToken(code)
```

## Error Handling

Common authentication errors:

| Status Code | Description |
|------------|-------------|
| 401 | Invalid credentials |
| 403 | Insufficient permissions |

[Learn more about Error Handling →](/api/error-handling)
```

