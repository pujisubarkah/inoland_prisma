# Instansi Kategori API Documentation

API endpoints untuk mengelola data kategori instansi.

## Base URL
```
/api/instansi_kategori
```

## Endpoints

### 1. Get All Kategori Instansi
**GET** `/api/instansi_kategori`

Mengambil semua data kategori instansi dengan opsi pencarian.

#### Query Parameters:
- `search` (optional): Pencarian berdasarkan nama kategori

#### Response:
```json
{
  "success": true,
  "message": "Found X kategori instansi",
  "data": [
    {
      "id": 1,
      "kat_instansi": "Kementerian"
    }
  ]
}
```

#### Examples:
```bash
# Get all kategori
GET /api/instansi_kategori

# Search kategori
GET /api/instansi_kategori?search=kementerian
```

### 2. Get Kategori by ID
**GET** `/api/instansi_kategori/{id}`

### 3. Create New Kategori
**POST** `/api/instansi_kategori`

#### Request Body:
```json
{
  "kat_instansi": "Nama Kategori" // required
}
```

### 4. Update Kategori
**PUT** `/api/instansi_kategori/{id}`

### 5. Delete Kategori
**DELETE** `/api/instansi_kategori/{id}`

---

# Instansi API Documentation

API endpoints untuk mengelola data instansi.

## Base URL
```
/api/instansi
```

## Endpoints

### 1. Get All Instansi
**GET** `/api/instansi`

Mengambil semua data instansi dengan opsi filtering.

#### Query Parameters:
- `agency_category_id` (optional): Filter berdasarkan ID kategori instansi
- `search` (optional): Pencarian berdasarkan agency_id, agency_name, atau kategori

#### Response:
```json
{
  "success": true,
  "message": "Found X instansi",
  "data": [
    {
      "id": 1,
      "agency_id": "12345",
      "agency_name": "Kementerian ABC",
      "agency_category_id": 1,
      "kategori": {
        "id": 1,
        "kat_instansi": "Kementerian"
      }
    }
  ]
}
```

#### Examples:
```bash
# Get all instansi
GET /api/instansi

# Filter by category
GET /api/instansi?agency_category_id=1

# Search instansi
GET /api/instansi?search=kementerian
```

### 2. Get Instansi by ID
**GET** `/api/instansi/{id}`

### 3. Create New Instansi
**POST** `/api/instansi`

#### Request Body:
```json
{
  "agency_id": "12345", // required, unique
  "agency_name": "Nama Instansi", // required
  "agency_category_id": 1 // optional
}
```

### 4. Update Instansi
**PUT** `/api/instansi/{id}`

### 5. Delete Instansi
**DELETE** `/api/instansi/{id}`

---

# Updated - Inolands Inovator API

API `inolands_inovator` sekarang telah diupdate untuk menyertakan informasi instansi dalam response.

## Updated Response Format

Setiap response dari API `inolands_inovator` sekarang menyertakan informasi instansi:

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
      },
      "instansi": {
        "id": 1,
        "agency_id": "12345",
        "agency_name": "Kementerian ABC",
        "agency_category_id": 1,
        "kat_instansi": "Kementerian"
      }
    }
  ]
}
```

## Database Schema Updates

### instansi_kategori Table
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| kat_instansi | varchar(255) | Nama kategori instansi |

### instansi Table
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| agency_id | varchar(255) | ID agency (unique) |
| agency_name | varchar(500) | Nama instansi |
| agency_category_id | integer | Foreign key ke instansi_kategori |

### Updated inolands_inovator Table
| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| inovator | text | Nama inovator |
| agency_id_panrb | varchar(255) | **Foreign key ke instansi.agency_id** |
| id_kabkot | integer | Foreign key ke master_kabupaten |
| id_provinsi | integer | Foreign key ke master_provinsi |
| longlat | text | Koordinat longitude,latitude |
| alamat | text | Alamat lengkap |

## Relasi
- `instansi.agency_category_id` berelasi dengan `instansi_kategori.id`
- `inolands_inovator.agency_id_panrb` berelasi dengan `instansi.agency_id`
- Semua query `inolands_inovator` sekarang menyertakan join dengan `instansi` dan `instansi_kategori`
- Pencarian pada `inolands_inovator` juga mencakup nama instansi dan kategori instansi
