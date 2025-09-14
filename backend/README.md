# User API Server

A RESTful API server built with Express.js and PostgreSQL for managing user data with CRUD operations and avatar image upload functionality.

## Features

- ✅ Complete CRUD operations for User model
- ✅ PostgreSQL database integration
- ✅ Avatar image upload with multer
- ✅ Input validation with express-validator
- ✅ File type and size validation
- ✅ Error handling and logging
- ✅ Security middleware (Helmet, CORS)
- ✅ Environment configuration
- ✅ Database table auto-initialization
- ✅ Swagger API documentation with interactive UI

## User Model Fields

- `id` - Auto-incrementing primary key
- `firstName` - User's first name (required)
- `lastName` - User's last name (required)
- `country` - User's country (required)
- `city` - User's city (required)
- `email` - User's email address (required, unique)
- `phoneNumber` - User's phone number (optional)
- `avatar` - Path to uploaded avatar image (optional)
- `createdAt` - Timestamp when user was created
- `updatedAt` - Timestamp when user was last updated

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd my-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp config.env.example config.env
```

4. Update the `config.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_api_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
NODE_ENV=development
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

5. Create the PostgreSQL database:
```sql
CREATE DATABASE user_api_db;
```

6. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will automatically create the users table on first startup.

## API Documentation

The API includes comprehensive Swagger documentation with an interactive UI:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **API Information**: `http://localhost:3000/`

The Swagger documentation includes:
- Complete API endpoint descriptions
- Request/response schemas
- Example requests and responses
- Interactive testing interface
- File upload specifications

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Health Check
```
GET /health
```
Returns server status and environment information.

### API Documentation
```
GET /api-docs
```
Interactive Swagger UI documentation for all API endpoints.

### Users API

#### Get All Users
```
GET /api/users
```
**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "country": "USA",
      "city": "New York",
      "email": "john.doe@example.com",
      "phoneNumber": "+1234567890",
      "avatar": "/uploads/avatar-1234567890-123456789.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get User by ID
```
GET /api/users/:id
```
**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "city": "New York",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "avatar": "/uploads/avatar-1234567890-123456789.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create New User
```
POST /api/users
Content-Type: multipart/form-data
```
**Form Data:**
- `firstName` (string, required) - User's first name
- `lastName` (string, required) - User's last name
- `country` (string, required) - User's country
- `city` (string, required) - User's city
- `email` (string, required) - Valid email address
- `phoneNumber` (string, optional) - Valid phone number
- `avatar` (file, optional) - Image file (JPEG, JPG, PNG, GIF, WebP, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "city": "New York",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "avatar": "/uploads/avatar-1234567890-123456789.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User
```
PUT /api/users/:id
Content-Type: multipart/form-data
```
**Form Data:** (All fields optional)
- `firstName` (string) - User's first name
- `lastName` (string) - User's last name
- `country` (string) - User's country
- `city` (string) - User's city
- `email` (string) - Valid email address
- `phoneNumber` (string) - Valid phone number
- `avatar` (file) - Image file (JPEG, JPG, PNG, GIF, WebP, max 5MB)

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "country": "Canada",
    "city": "Toronto",
    "email": "jane.doe@example.com",
    "phoneNumber": "+1987654321",
    "avatar": "/uploads/avatar-1234567890-987654321.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

#### Delete User
```
DELETE /api/users/:id
```
**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "country": "USA",
    "city": "New York",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "avatar": "/uploads/avatar-1234567890-123456789.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

### Conflict (409)
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### File Upload Error (400)
```json
{
  "success": false,
  "message": "Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Detailed error message (development only)"
}
```

## File Upload

- **Supported formats:** JPEG, JPG, PNG, GIF, WebP
- **Maximum file size:** 5MB (configurable)
- **Upload directory:** `./uploads/`
- **File naming:** `avatar-{timestamp}-{random}.{extension}`
- **Access:** Uploaded files are served at `/uploads/{filename}`

## Testing with cURL

### Create a user with avatar:
```bash
curl -X POST http://localhost:3000/api/users \
  -F "firstName=John" \
  -F "lastName=Doe" \
  -F "country=USA" \
  -F "city=New York" \
  -F "email=john.doe@example.com" \
  -F "phoneNumber=+1234567890" \
  -F "avatar=@/path/to/image.jpg"
```

### Get all users:
```bash
curl http://localhost:3000/api/users
```

### Update a user:
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -F "firstName=Jane" \
  -F "country=Canada"
```

### Delete a user:
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Project Structure

```
my-nodejs/
├── config/
│   ├── database.js      # PostgreSQL connection configuration
│   └── upload.js        # Multer file upload configuration
├── middleware/
│   └── validation.js    # Input validation middleware
├── models/
│   └── User.js          # User model with database operations
├── routes/
│   └── users.js         # User CRUD routes
├── uploads/             # Directory for uploaded avatar images
├── config.env           # Environment variables
├── package.json         # Dependencies and scripts
├── server.js           # Main Express server
└── README.md           # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | user_api_db |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | password |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `UPLOAD_PATH` | Upload directory | ./uploads |
| `MAX_FILE_SIZE` | Max file size in bytes | 5242880 (5MB) |

## Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Request data validation
- **File type validation** - Only image files allowed
- **File size limits** - Prevents large file uploads
- **SQL injection protection** - Parameterized queries

## License

ISC