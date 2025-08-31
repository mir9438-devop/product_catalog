# Product Catalog

A modern product catalog application built with a microservices architecture using Docker containers.

## Prerequisites

Before running this application, ensure you have the following installed on your system:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to set up and run the Product Catalog application:

### 1. Clone the Repository

```bash
git clone https://github.com/mir9438-devop/product_catalog.git
```

### 2. Navigate to Project Directory

```bash
cd product_catalog
```

### 3. Environment Configuration

Copy the example environment files and configure them as needed:

```bash
# Backend environment setup
cp backend/.env.example backend/.env

# Frontend environment setup
cp frontend/.env.example frontend/.env
```

> **Note:** Edit the `.env` files in both `backend/` and `frontend/` directories to configure your environment variables according to your setup requirements.

### 4. Start the Services

Launch the backend and frontend services using Docker Compose:

```bash
# Start backend services
docker-compose -f backend/docker-compose.yml up -d

# Start frontend services
docker-compose -f frontend/docker-compose.yml up -d
```

### 5. Access the Application

Once all services are running, open your web browser and navigate to:

```
http://0.0.0.0:8112
```

## Project Structure

```
product_catalog/
├── backend/
│   ├── docker-compose.yml
│   ├── .env.example
│   └── ...
├── frontend/
│   ├── docker-compose.yml
│   ├── .env.example
│   └── ...
└── README.md
```

## Stopping the Application

To stop all running services:

```bash
# Stop backend services
docker-compose -f backend/docker-compose.yml down

# Stop frontend services
docker-compose -f frontend/docker-compose.yml down
```

## Troubleshooting

- Ensure Docker and Docker Compose are properly installed and running
- Check that ports are not being used by other applications
- Verify environment variables are correctly configured in the `.env` files
- Check container logs using `docker-compose logs` if services fail to start

## Support

For issues and questions, please create an issue in the [GitHub repository](https://github.com/mir9438-devop/product_catalog/issues).

## License

Mihir Panchal
