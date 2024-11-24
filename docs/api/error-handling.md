```markdown
# Error Handling

Comprehensive guide to handling errors in our API.

## Error Types

### Client Errors (4xx)

| Code | Name | Description |
|------|------|-------------|
| 400 | Bad Request | Invalid request payload |
| 401 | Unauthorized | Missing or invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Errors (5xx)

| Code | Name | Description |
|------|------|-------------|
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Invalid response from upstream |
| 503 | Service Unavailable | Service temporarily down |

## Error Response Format

```javascript
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "invalid_format"
    }
  }
}
```

## Handling Errors

### JavaScript
```javascript
try {
  await platform.users.create(userData)
} catch (error) {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      handleValidationError(error)
      break
    case 'RATE_LIMIT_ERROR':
      await handleRateLimit(error)
      break
    default:
      handleUnexpectedError(error)
  }
}
```

### Python
```python
try:
    platform.users.create(user_data)
except ValidationError as e:
    handle_validation_error(e)
except RateLimitError as e:
    handle_rate_limit(e)
except Exception as e:
    handle_unexpected_error(e)
```
```

