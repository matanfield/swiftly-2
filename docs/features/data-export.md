```markdown
# Data Export

Export and manage your platform data.

## Export Options

### Full Export
```javascript
const export = await platform.export.full({
  format: 'json',
  compress: true
})
```

### Selective Export
```javascript
const export = await platform.export.selective({
  resources: ['users', 'orders'],
  dateRange: {
    start: '2023-01-01',
    end: '2023-12-31'
  }
})
```

## Export Formats

- JSON
- CSV
- XML
- Excel

## Scheduling Exports

### Automated Exports
```javascript
const schedule = await platform.export.schedule({
  frequency: 'daily',
  time: '00:00',
  format: 'json',
  destination: {
    type: 's3',
    bucket: 'exports'
  }
})
```

### Export Status
```javascript
const status = await platform.export.status(exportId)
```
```

