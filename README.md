# 📘 PHLY API Documentation

**Base URL:** `https://phly.ir/api/`  
**Content-Type:** `application/json`

---

## 🔗 Create Short Link

**Endpoint:** `/links/create`  
**Method:** `POST`

### Request Parameters

| Name | Type   | Required | Description                     |
|------|--------|----------|---------------------------------|
| url  | string | ✅       | The original URL to shorten     |

### Example Request
```json
{
  "url": "https://example.com"
}
```

### Example Response
```json
{
  "message": "success",
  "status": 200,
  "data": {
    "code": "jucc"
  }
}
```

### Usage
Use the short link via:  
```
https://phly.ir/jucc
```

---

## 💡 Submit Idea

**Endpoint:** `/ideas/create`  
**Method:** `POST`

### Request Parameters

| Name | Type   | Required | Description             |
|------|--------|----------|-------------------------|
| idea | string | ✅       | The idea content to send |

### Example Request
```json
{
  "idea": "Add support for analytics on short links"
}
```

### Response

- **HTTP 200** – Everything is OK  

---

📎 To use this API, make sure you send all requests with the appropriate `Content-Type: application/json` header.
