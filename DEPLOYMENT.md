# 🚀 Auto Music Mix Generator - Deployment Guide

This guide covers all deployment options for the Auto Music Mix & Play Generator system.

## 📋 Prerequisites

- Python 3.8 or higher
- Git
- (Optional) Docker and Docker Compose
- (Optional) Cloud platform accounts (Heroku, Railway, Render, Vercel)

## 🛠️ Quick Setup

### 1. Initial Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd auto-music-mixer

# Run the setup script
chmod +x deploy.sh
./deploy.sh setup
```

### 2. Make the deployment script executable

```bash
chmod +x deploy.sh
```

## 🏠 Local Deployment

### Option 1: Using the deployment script

```bash
./deploy.sh local
```

### Option 2: Manual setup

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p uploads exports logs

# Run the application
python mix_generator_web.py
```

**Access the application at:** `http://localhost:5000`

## 🐳 Docker Deployment

### Option 1: Using the deployment script

```bash
./deploy.sh docker
```

### Option 2: Manual Docker deployment

```bash
# Build the Docker image
docker build -t auto-music-mixer .

# Run the container
docker run -d \
  --name auto-music-mixer \
  -p 5000:5000 \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/exports:/app/exports \
  -v $(pwd)/logs:/app/logs \
  --restart unless-stopped \
  auto-music-mixer
```

### Docker Compose (Recommended)

```bash
# Deploy with Docker Compose
./deploy.sh compose

# Or manually
docker-compose up -d
```

**Access the application at:** `http://localhost:5000`

## ☁️ Cloud Platform Deployment

### Heroku

#### Prerequisites
- Heroku CLI installed
- Heroku account

#### Deployment

```bash
# Deploy to Heroku
./deploy.sh heroku

# Or manually
heroku create your-app-name
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Environment Variables
Set these in your Heroku dashboard:
```bash
heroku config:set SECRET_KEY=your-secret-key
heroku config:set SPOTIFY_CLIENT_ID=your-spotify-client-id
heroku config:set SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
heroku config:set SUNO_API_KEY=your-suno-api-key
heroku config:set UDIO_API_KEY=your-udio-api-key
```

### Railway

#### Prerequisites
- Railway CLI installed
- Railway account

#### Deployment

```bash
# Deploy to Railway
./deploy.sh railway

# Or manually
railway login
railway init
railway up
```

### Render

#### Prerequisites
- Render account
- GitHub repository

#### Deployment

1. **Create render.yaml** (already included)
2. **Connect to GitHub:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Render will automatically detect the `render.yaml` configuration

#### Environment Variables
Set these in your Render dashboard:
- `SECRET_KEY`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SUNO_API_KEY`
- `UDIO_API_KEY`

### Vercel

#### Prerequisites
- Vercel CLI installed
- Vercel account

#### Deployment

```bash
# Deploy to Vercel
./deploy.sh vercel

# Or manually
vercel --prod
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-secret-key-change-this-in-production

# API Keys
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SUNO_API_KEY=your_suno_api_key
UDIO_API_KEY=your_udio_api_key

# Database Configuration (if needed)
DATABASE_URL=sqlite:///mixes.db

# File Storage
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216  # 16MB max file size
```

### Getting API Keys

#### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Get your Client ID and Client Secret

#### Suno AI
1. Go to [Suno AI](https://suno.ai)
2. Sign up and get your API key

#### Udio
1. Go to [Udio](https://udio.com)
2. Sign up and get your API key

## 📊 Monitoring and Logs

### View Logs

```bash
# Docker Compose logs
./deploy.sh logs

# Or manually
docker-compose logs -f

# Docker logs
docker logs -f auto-music-mixer
```

### Health Check

The application includes a health check endpoint:
- **URL:** `http://your-domain/health`
- **Method:** GET
- **Response:** `{"status": "healthy"}`

## 🔒 Security Considerations

### Production Checklist

- [ ] Change `SECRET_KEY` to a strong, random value
- [ ] Set `FLASK_DEBUG=False`
- [ ] Use HTTPS in production
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting
- [ ] Use environment variables for sensitive data
- [ ] Enable logging and monitoring
- [ ] Set up backup strategies

### Security Headers

Add these headers to your web server configuration:

```nginx
# Nginx example
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 🚀 Performance Optimization

### Production Settings

1. **Use a production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 mix_generator_web:app
   ```

2. **Enable caching:**
   ```python
   # Add Redis caching
   from flask_caching import Cache
   cache = Cache(config={'CACHE_TYPE': 'redis'})
   ```

3. **Use a CDN** for static assets

4. **Database optimization** (if using a database)

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        python demo.py
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port already in use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

#### 2. Docker build fails
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t auto-music-mixer .
```

#### 3. Permission denied
```bash
# Make scripts executable
chmod +x deploy.sh
chmod +x setup.py
```

#### 4. Virtual environment issues
```bash
# Remove and recreate virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Debug Mode

For debugging, set environment variables:
```bash
export FLASK_DEBUG=True
export FLASK_ENV=development
```

## 📞 Support

### Getting Help

1. **Check the logs:** `./deploy.sh logs`
2. **Run the demo:** `python demo.py`
3. **Check configuration:** Verify your `.env` file
4. **Test locally:** `./deploy.sh local`

### Useful Commands

```bash
# Stop all containers
./deploy.sh stop

# View logs
./deploy.sh logs

# Run setup
./deploy.sh setup

# Deploy locally
./deploy.sh local

# Deploy with Docker
./deploy.sh docker

# Deploy with Docker Compose
./deploy.sh compose
```

## 🎯 Next Steps

After successful deployment:

1. **Test the application** by creating a mix
2. **Configure API keys** for full functionality
3. **Set up monitoring** and logging
4. **Configure backups** for your data
5. **Set up SSL certificates** for HTTPS
6. **Configure a custom domain** (optional)

## 📚 Additional Resources

- [Flask Deployment Guide](https://flask.palletsprojects.com/en/2.3.x/deploying/)
- [Docker Documentation](https://docs.docker.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Happy Deploying! 🚀🎵**