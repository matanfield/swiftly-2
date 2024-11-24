import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Docs",
  description: "A VitePress Documentation Site",
  
  // Enable full-text search
  themeConfig: {
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/getting-started' },
      { text: 'Features', link: '/features/core-features' },
      { text: 'API', link: '/api/authentication' }
    ],

    sidebar: {
      '/guides/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guides/getting-started' },
            { text: 'Installation', link: '/guides/installation' },
            { text: 'Configuration', link: '/guides/configuration' }
          ]
        },
        {
          text: 'Fundamentals',
          items: [
            { text: 'Basic Concepts', link: '/guides/basic-concepts' },
            { text: 'Architecture', link: '/guides/architecture' },
            { text: 'Best Practices', link: '/guides/best-practices' }
          ]
        }
      ],
      '/features/': [
        {
          text: 'Core Features',
          items: [
            { text: 'Overview', link: '/features/core-features' },
            { text: 'Authentication', link: '/features/authentication' },
            { text: 'Authorization', link: '/features/authorization' }
          ]
        },
        {
          text: 'Advanced Features',
          items: [
            { text: 'Webhooks', link: '/features/webhooks' },
            { text: 'Rate Limiting', link: '/features/rate-limiting' },
            { text: 'Data Export', link: '/features/data-export' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'REST API',
          items: [
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Users', link: '/api/users' },
            { text: 'Products', link: '/api/products' }
          ]
        },
        {
          text: 'SDK Reference',
          items: [
            { text: 'JavaScript SDK', link: '/api/javascript-sdk' },
            { text: 'Python SDK', link: '/api/python-sdk' },
            { text: 'Error Handling', link: '/api/error-handling' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})