```markdown
# Rate Limiting

Understand and configure rate limiting for your API usage.

## Rate Limit Configuration

### Basic Setup
```javascript
const rateLimiter = {
  window: '1m',
  max: 100,
  headers: true
}
```

### Advanced Options
```javascript
const advancedLimiter = {
  tiers: {
    basic: {
      window: '1m',
      max: 100
    },
    premium: {
      window: '1m',
      max: 1000
    }
  },
  storage: 'redis',
  headers: true
}
```

## Monitoring Usage

### Check Current Usage
```javascript
const usage = await platform.rateLimit.check({
  apiKey: 'your_api_key'
})
```

### Rate Limit Headers
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

## Handling Rate Limits

```javascript
try {
  await makeApiCall()
} catch (error) {
  if (error.code === 429) {
    const resetTime = error.headers['x-ratelimit-reset']
    await wait(resetTime)
    return makeApiCall()
  }
  throw error
}
```
```

