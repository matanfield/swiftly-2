```markdown
# Webhooks

Integrate real-time updates with webhooks.

## Setting Up Webhooks

### Registration
```javascript
const webhook = await platform.webhooks.create({
  url: 'https://your-domain.com/webhook',
  events: ['user.created', 'order.updated'],
  secret: 'your_webhook_secret'
})
```

### Event Types
- Resource events (created, updated, deleted)
- System events (maintenance, updates)
- Custom events

## Handling Webhook Events

### Verification
```javascript
const isValid = platform.webhooks.verify({
  payload: request.body,
  signature: request.headers['x-webhook-signature'],
  secret: 'your_webhook_secret'
})
```

### Processing Events
```javascript
app.post('/webhook', (req, res) => {
  const event = req.body
  
  switch (event.type) {
    case 'user.created':
      handleNewUser(event.data)
      break
    case 'order.updated':
      updateOrderStatus(event.data)
      break
  }
  
  res.status(200).send('OK')
})
```
```

