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

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   ```bash
   # Restart with fresh database
   docker-compose down -v
   docker-compose up -d
   ```

2. **Port conflicts**
   - Ensure ports 3000, 3002, and 5433 are available
   - Modify ports in docker-compose.yml if needed

3. **File upload issues**
   - Check upload directory permissions
   - Verify file size limits (5MB max)

4. **Frontend not loading**
   - Check if backend is healthy: `docker-compose ps`
   - Verify API URL configuration

### Reset Everything
```bash
# Complete reset (removes all data)
docker-compose down -v
docker system prune -f
docker-compose up --build -d
```

## 📝 Environment Variables

The application uses the following environment variables:

### Database
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password

### Backend
- `NODE_ENV` - Environment (production/development)
- `PORT` - Server port
- `UPLOAD_PATH` - File upload directory
- `MAX_FILE_SIZE` - Maximum file size

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_UPLOAD_URL` - File upload URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker Compose
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy Coding! 🚀**
