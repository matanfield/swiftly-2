```markdown
# Quick Start

Get up and running with our platform in minutes.

## Prerequisites

- Node.js 16 or higher
- npm or yarn
- API key (get it from your dashboard)

## Installation

```bash
npm install @our-platform/sdk
```

## Basic Usage

```javascript
import { Platform } from '@our-platform/sdk'

const platform = new Platform({
  apiKey: 'your-api-key'
})

// Initialize your first resource
await platform.initialize()
```

## Next Steps

- Learn about [Basic Concepts](/guides/basic-concepts)
- Explore the [Architecture](/guides/architecture)
- Check out our [Best Practices](/guides/best-practices)
```

