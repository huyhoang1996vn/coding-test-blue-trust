# DataTys - Full Stack User Management Application

A modern full-stack web application built with React frontend, Node.js/Express backend, and PostgreSQL database, all containerized with Docker.

## 🏗️ Architecture

### Frontend
- **Technology**: React 17 with modern hooks
- **Styling**: CSS3 with responsive design
- **Features**:
  - User list with search and filtering
  - User profile management
  - File upload functionality
  - Responsive navigation
  - Toast notifications
  - Form validation with React Hook Form

### Backend
- **Technology**: Node.js with Express.js
- **Database**: PostgreSQL 15
- **Features**:
  - RESTful API with CRUD operations
  - File upload handling with Multer
  - Input validation with Express Validator
  - Swagger API documentation
  - Security middleware (Helmet, CORS)
  - Database connection pooling

### Database
- **Technology**: PostgreSQL 15 Alpine
- **Features**:
  - User management schema
  - Automatic initialization with sample data
  - Persistent data storage

## 🚀 Quick Start

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coding-test-datatys
   ```

2. **Start all services**
   ```bash
   docker-compose up --build -d
   ```

3. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3002
   - **API Documentation**: http://localhost:3002/api-docs
   - **Database**: localhost:5433

## 📋 Available Commands

### Docker Compose Commands
```bash
# Start all services
docker-compose up -d

# Start with rebuild
docker-compose up --build -d

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes all data)
docker-compose down -v

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Backend Commands (inside container)
```bash
# Access backend container
docker-compose exec backend sh

# Initialize database with sample data
docker-compose exec backend npm run init-data

# Clear all user data
docker-compose exec backend npm run clear-data

# Reset database (clear and reinitialize)
docker-compose exec backend npm run reset-data
```

## 🗄️ Database

### Connection Details
- **Host**: localhost (from host) / postgres (from containers)
- **Port**: 5433 (from host) / 5432 (from containers)
- **Database**: bluetrust
- **Username**: postgres
- **Password**: admin1996

### Sample Data
The application comes pre-loaded with 4 sample users:
1. **John Doe** - New York, USA
2. **Jane Smith** - Toronto, Canada
3. **Ahmed Hassan** - Cairo, Egypt
4. **Maria Garcia** - Madrid, Spain

## 🔧 API Endpoints

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### File Upload
- `POST /api/users/:id/avatar` - Upload user avatar
- `GET /uploads/:filename` - Serve uploaded files

### System
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation

## 🏗️ Project Structure

```
coding-test-datatys/
├── backend/                 # Node.js/Express API
│   ├── config/             # Configuration files
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── scripts/           # Database scripts
│   └── uploads/           # File uploads
├── frontend/              # React application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── pages/         # Page components
│       └── tools/         # Utility functions
├── docker-compose.yml     # Docker services configuration
└── README.md             # This file
```

## 🛠️ Development

### Backend Development
The backend is built with:
- **Express.js** - Web framework
- **PostgreSQL** - Database with pg driver
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **Swagger** - API documentation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend Development
The frontend is built with:
- **React 17** - UI library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Toastify** - Notifications

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Configured for specific origins
- **Input Validation** - Server-side validation
- **File Upload Security** - Type and size restrictions
- **Environment Variables** - Sensitive data protection

## 📊 Monitoring

### Health Checks
All services include health checks:
- **PostgreSQL**: Database connectivity
- **Backend**: API endpoint availability
- **Frontend**: Nginx service status

### Logs
View service logs for debugging:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```
![REC-20250914204525](https://github.com/user-attachments/assets/25782357-c412-45b9-b00e-2505cc87cbba)

<img width="1754" height="914" alt="image" src="https://github.com/user-attachments/assets/0c815fb6-39a3-4a76-8100-323d72f6c6e3" />

<img width="1762" height="1055" alt="image" src="https://github.com/user-attachments/assets/979b099c-f90d-463e-8da2-7615db24e466" />

<img width="1688" height="993" alt="image" src="https://github.com/user-attachments/assets/3030142d-04a7-44bd-8c8c-4926309df407" />

