cat <<EOL > README.md
# Product Catalog Project

## Setup Instructions

1. git clone https://github.com/mir9438-devop/product_catalog.git
2. cd product_catalog
3. Please install Docker and docker-compose if not installed
4. cp backend/.env.example backend/.env
5. cp frontend/.env.example frontend/.env
6. docker-compose -f backend/docker-compose.yml up -d
7. docker-compose -f frontend/docker-compose.yml up -d
8. Copy the URL (e.g., 0.0.0.0:8112) and open it in your browser.
EOL
