```markdown
# Authorization

Control access to resources with our authorization system.

## Role-Based Access Control

### Roles
```javascript
const roles = {
  admin: {
    permissions: ['read', 'write', 'delete'],
    resources: ['*']
  },
  user: {
    permissions: ['read', 'write'],
    resources: ['posts', 'comments']
  }
}
```

### Permissions
- Create
- Read
- Update
- Delete

## Policy Management

### Creating Policies
```javascript
const policy = new Policy({
  name: 'content_editor',
  permissions: ['read', 'write'],
  resources: ['articles', 'media']
})
```

### Applying Policies
```javascript
await platform.policies.assign({
  userId: 'user123',
  policyName: 'content_editor'
})
```

## Access Verification

```javascript
const canAccess = await platform.auth.verify({
  user: currentUser,
  action: 'write',
  resource: 'articles'
})
```
```

