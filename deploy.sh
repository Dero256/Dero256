#!/bin/bash

# Auto Music Mix Generator - Deployment Script
# Supports multiple deployment methods

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="auto-music-mixer"
DEFAULT_PORT=5000
DOCKER_IMAGE="auto-music-mixer:latest"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}🎵 Auto Music Mix Generator${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Python version
check_python() {
    if command_exists python3; then
        PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        print_status "Python $PYTHON_VERSION detected"
        return 0
    elif command_exists python; then
        PYTHON_VERSION=$(python -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        print_status "Python $PYTHON_VERSION detected"
        return 0
    else
        print_error "Python not found. Please install Python 3.8 or higher."
        return 1
    fi
}

# Function to deploy locally
deploy_local() {
    print_status "Deploying locally..."
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        print_status "Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing dependencies..."
    pip install -r requirements.txt
    
    # Create necessary directories
    mkdir -p uploads exports logs
    
    # Run the application
    print_status "Starting the application..."
    python mix_generator_web.py
}

# Function to deploy with Docker
deploy_docker() {
    print_status "Deploying with Docker..."
    
    if ! command_exists docker; then
        print_error "Docker not found. Please install Docker first."
        exit 1
    fi
    
    # Build Docker image
    print_status "Building Docker image..."
    docker build -t $DOCKER_IMAGE .
    
    # Run container
    print_status "Starting Docker container..."
    docker run -d \
        --name $APP_NAME \
        -p $DEFAULT_PORT:5000 \
        -v $(pwd)/uploads:/app/uploads \
        -v $(pwd)/exports:/app/exports \
        -v $(pwd)/logs:/app/logs \
        --restart unless-stopped \
        $DOCKER_IMAGE
    
    print_status "Application deployed at http://localhost:$DEFAULT_PORT"
}

# Function to deploy with Docker Compose
deploy_docker_compose() {
    print_status "Deploying with Docker Compose..."
    
    if ! command_exists docker-compose; then
        print_error "Docker Compose not found. Please install Docker Compose first."
        exit 1
    fi
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_warning "Creating .env file with default values..."
        cat > .env << EOF
SECRET_KEY=your-secret-key-change-this-in-production
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SUNO_API_KEY=your_suno_api_key
UDIO_API_KEY=your_udio_api_key
DB_PASSWORD=password
EOF
    fi
    
    # Start services
    print_status "Starting services with Docker Compose..."
    docker-compose up -d
    
    print_status "Application deployed at http://localhost:$DEFAULT_PORT"
    print_status "To view logs: docker-compose logs -f"
}

# Function to deploy to cloud platforms
deploy_cloud() {
    local platform=$1
    
    case $platform in
        "heroku")
            deploy_heroku
            ;;
        "railway")
            deploy_railway
            ;;
        "render")
            deploy_render
            ;;
        "vercel")
            deploy_vercel
            ;;
        *)
            print_error "Unknown platform: $platform"
            print_status "Supported platforms: heroku, railway, render, vercel"
            exit 1
            ;;
    esac
}

# Function to deploy to Heroku
deploy_heroku() {
    print_status "Deploying to Heroku..."
    
    if ! command_exists heroku; then
        print_error "Heroku CLI not found. Please install Heroku CLI first."
        exit 1
    fi
    
    # Create Procfile if it doesn't exist
    if [ ! -f "Procfile" ]; then
        echo "web: python mix_generator_web.py" > Procfile
    fi
    
    # Create runtime.txt if it doesn't exist
    if [ ! -f "runtime.txt" ]; then
        echo "python-3.11.0" > runtime.txt
    fi
    
    # Deploy to Heroku
    heroku create $APP_NAME || true
    git add .
    git commit -m "Deploy to Heroku" || true
    git push heroku main
    
    print_status "Application deployed to Heroku"
    print_status "URL: https://$APP_NAME.herokuapp.com"
}

# Function to deploy to Railway
deploy_railway() {
    print_status "Deploying to Railway..."
    
    if ! command_exists railway; then
        print_error "Railway CLI not found. Please install Railway CLI first."
        exit 1
    fi
    
    # Deploy to Railway
    railway login
    railway init
    railway up
    
    print_status "Application deployed to Railway"
}

# Function to deploy to Render
deploy_render() {
    print_status "Deploying to Render..."
    
    # Create render.yaml if it doesn't exist
    if [ ! -f "render.yaml" ]; then
        cat > render.yaml << EOF
services:
  - type: web
    name: auto-music-mixer
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python mix_generator_web.py
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: FLASK_ENV
        value: production
EOF
    fi
    
    print_status "Please deploy manually to Render:"
    print_status "1. Go to https://render.com"
    print_status "2. Connect your GitHub repository"
    print_status "3. Create a new Web Service"
    print_status "4. Use the render.yaml configuration"
}

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_error "Vercel CLI not found. Please install Vercel CLI first."
        exit 1
    fi
    
    # Create vercel.json if it doesn't exist
    if [ ! -f "vercel.json" ]; then
        cat > vercel.json << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "mix_generator_web.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "mix_generator_web.py"
    }
  ]
}
EOF
    fi
    
    # Deploy to Vercel
    vercel --prod
    
    print_status "Application deployed to Vercel"
}

# Function to show help
show_help() {
    print_header
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  local              Deploy locally with Python"
    echo "  docker             Deploy with Docker"
    echo "  compose            Deploy with Docker Compose"
    echo "  heroku             Deploy to Heroku"
    echo "  railway            Deploy to Railway"
    echo "  render             Deploy to Render"
    echo "  vercel             Deploy to Vercel"
    echo "  setup              Run initial setup"
    echo "  stop               Stop running containers"
    echo "  logs               Show application logs"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 local           # Deploy locally"
    echo "  $0 docker          # Deploy with Docker"
    echo "  $0 heroku          # Deploy to Heroku"
}

# Function to stop containers
stop_containers() {
    print_status "Stopping containers..."
    
    if command_exists docker-compose; then
        docker-compose down
    fi
    
    if command_exists docker; then
        docker stop $APP_NAME 2>/dev/null || true
        docker rm $APP_NAME 2>/dev/null || true
    fi
    
    print_status "Containers stopped"
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    
    if command_exists docker-compose; then
        docker-compose logs -f
    elif command_exists docker; then
        docker logs -f $APP_NAME
    else
        print_error "Docker not found"
    fi
}

# Main script
main() {
    print_header
    
    case "${1:-help}" in
        "local")
            check_python
            deploy_local
            ;;
        "docker")
            deploy_docker
            ;;
        "compose")
            deploy_docker_compose
            ;;
        "heroku"|"railway"|"render"|"vercel")
            deploy_cloud $1
            ;;
        "setup")
            check_python
            python3 setup.py
            ;;
        "stop")
            stop_containers
            ;;
        "logs")
            show_logs
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function
main "$@"