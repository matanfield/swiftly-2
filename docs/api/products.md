```markdown
# Products API

Manage products through our REST API.

## Endpoints

### Create Product
```bash
POST /api/v1/products

{
  "name": "Premium Widget",
  "price": 99.99,
  "category": "electronics"
}
```

### List Products
```bash
GET /api/v1/products?category=electronics
```

### Update Product
```bash
PUT /api/v1/products/:id

{
  "price": 89.99
}
```

### Delete Product
```bash
DELETE /api/v1/products/:id
```

## Product Schema

```javascript
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "inventory": "number",
  "created": "datetime",
  "updated": "datetime"
}
```

## Filtering

- category
- price_min
- price_max
- in_stock
- created_after
- created_before
```

