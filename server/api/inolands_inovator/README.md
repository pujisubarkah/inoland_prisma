# Inolands Inovator API Documentation

API endpoints untuk mengelola data inovator dalam sistem Inolands.

## Base URL
```
/api/inolands_inovator
```

## Endpoints

### 1. Get All Inovators
**GET** `/api/inolands_inovator`

Mengambil semua data inovator dengan opsi filtering.

#### Query Parameters:
- `id_provinsi` (optional): Filter berdasarkan ID provinsi
- `id_kabkot` (optional): Filter berdasarkan ID kabupaten/kota  
- `search` (optional): Pencarian berdasarkan nama inovator, alamat, atau wilayah

#### Response:
```json
{
  "success": true,
  "message": "Found X inovator(s)",
  "data": [
    {
      "id": 1,
      "inovator": "Nama Inovator",
      "agency_id_panrb": "12345",
      "id_kabkot": 1101,
      "id_provinsi": 11,
      "longlat": "-6.123456,106.789012",
      "alamat": "Jl. Contoh No. 123",
      "wilayah": {
        "id_provinsi": 11,
        "nama_provinsi": "Aceh",
        "id_kabkot": 1101,
        "nama_kabkot": "Kabupaten Simeulue"
      }
    }
  ]
}
```

#### Examples:
```bash
# Get all inovators
GET /api/inolands_inovator

# Get inovators from specific province
GET /api/inolands_inovator?id_provinsi=11

# Get inovators from specific kabkot
GET /api/inolands_inovator?id_kabkot=1101

# Search inovators
GET /api/inolands_inovator?search=john
```

### 2. Get Inovator by ID
**GET** `/api/inolands_inovator/{id}`

Mengambil data inovator berdasarkan ID.

#### Response:
```json
{
  "success": true,
  "message": "Inovator found",
  "data": {
    "id": 1,
    "inovator": "Nama Inovator",
    "agency_id_panrb": "12345",
    "id_kabkot": 1101,
    "id_provinsi": 11,
    "longlat": "-6.123456,106.789012",
    "alamat": "Jl. Contoh No. 123",
    "wilayah": {
      "id_provinsi": 11,
      "nama_provinsi": "Aceh",
      "id_kabkot": 1101,
      "nama_kabkot": "Kabupaten Simeulue"
    }
  }
}
```

### 3. Create New Inovator
**POST** `/api/inolands_inovator`

Membuat data inovator baru.

#### Request Body:
```json
{
  "inovator": "Nama Inovator", // required
  "agency_id_panrb": "12345", // optional
  "id_kabkot": 1101, // optional
  "id_provinsi": 11, // optional
  "longlat": "-6.123456,106.789012", // optional
  "alamat": "Jl. Contoh No. 123" // optional
}
```

#### Response:
```json
{
  "success": true,
  "message": "Inovator created successfully",
  "data": {
    "id": 1,
    "inovator": "Nama Inovator",
    "agency_id_panrb": "12345",
    "id_kabkot": 1101,
    "id_provinsi": 11,
    "longlat": "-6.123456,106.789012",
    "alamat": "Jl. Contoh No. 123"
  }
}
```

### 4. Update Inovator
**PUT** `/api/inolands_inovator/{id}`

Mengupdate data inovator berdasarkan ID.

#### Request Body:
```json
{
  "inovator": "Nama Inovator Updated",
  "agency_id_panrb": "54321",
  "id_kabkot": 1102,
  "id_provinsi": 11,
  "longlat": "-6.654321,106.210987",
  "alamat": "Jl. Update No. 456"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Inovator updated successfully",
  "data": {
    "id": 1,
    "inovator": "Nama Inovator Updated",
    "agency_id_panrb": "54321",
    "id_kabkot": 1102,
    "id_provinsi": 11,
    "longlat": "-6.654321,106.210987",
    "alamat": "Jl. Update No. 456"
  }
}
```

### 5. Delete Inovator
**DELETE** `/api/inolands_inovator/{id}`

Menghapus data inovator berdasarkan ID.

#### Response:
```json
{
  "success": true,
  "message": "Inovator deleted successfully"
}
```

### 6. Get Inovators by Kabkot
**GET** `/api/inolands_inovator/by-kabkot/{id_kabkot}`

Mengambil semua inovator dari kabupaten/kota tertentu.

#### Response:
```json
{
  "success": true,
  "message": "Found X inovator(s) in kabupaten/kota ID 1101",
  "data": [
    {
      "id": 1,
      "inovator": "Nama Inovator",
      "agency_id_panrb": "12345",
      "id_kabkot": 1101,
      "id_provinsi": 11,
      "longlat": "-6.123456,106.789012",
      "alamat": "Jl. Contoh No. 123",
      "wilayah": {
        "id_provinsi": 11,
        "nama_provinsi": "Aceh",
        "id_kabkot": 1101,
        "nama_kabkot": "Kabupaten Simeulue"
      }
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "statusMessage": "Bad Request",
  "data": {
    "error": "Field inovator is required"
  }
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "statusMessage": "Not Found",
  "data": {
    "error": "Inovator not found"
  }
}
```

### 405 Method Not Allowed
```json
{
  "statusCode": 405,
  "statusMessage": "Method Not Allowed"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "statusMessage": "Internal Server Error",
  "data": {
    "error": "Database connection failed"
  }
}
```

## Database Schema

Tabel `inolands_inovator` memiliki struktur sebagai berikut:

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| inovator | text | Nama inovator |
| agency_id_panrb | varchar(255) | ID agency PANRB |
| id_kabkot | integer | Foreign key ke master_kabupaten |
| id_provinsi | integer | Foreign key ke master_provinsi |
| longlat | text | Koordinat longitude,latitude |
| alamat | text | Alamat lengkap |

## Relasi

- `id_kabkot` berelasi dengan tabel `master_kabupaten`
- `id_provinsi` berelasi dengan tabel `master_provinsi`
- Setiap response akan menyertakan informasi wilayah melalui join dengan kedua tabel tersebut
