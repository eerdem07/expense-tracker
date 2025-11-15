## 📡 API Response Format

Proje boyunca tüm endpoint’ler aşağıdaki standart JSON formatını kullanır.

### ✅ Başarılı Response (200–201)

    {
      "success": true,
      "message": "Login successful",
      "data": {}
    }

### ❌ Hatalı Response (400–500)

    {
      "success": false,
      "message": "Validation error",
      "errors": [
        { "path": "email", "message": "Email is required" }
      ]
    }

Bu format basit, anlaşılır ve frontend tarafında tek satırla yönetilebilir:

    if (!res.success) {
      // handle error
    }

Tüm API endpoint’leri bu yapıyı takip eder.
