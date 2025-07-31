#!/usr/bin/env python3
"""
Setup script for Auto Music Mix & Play Generator
Helps with deployment and environment setup
"""

import os
import sys
import subprocess
import platform

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def create_virtual_environment():
    """Create virtual environment"""
    try:
        if not os.path.exists('venv'):
            print("🔧 Creating virtual environment...")
            subprocess.run([sys.executable, '-m', 'venv', 'venv'], check=True)
            print("✅ Virtual environment created")
        else:
            print("✅ Virtual environment already exists")
        return True
    except Exception as e:
        print(f"❌ Error creating virtual environment: {e}")
        return False

def install_dependencies():
    """Install required dependencies"""
    try:
        print("📦 Installing dependencies...")
        
        # Determine the correct pip command
        if os.name == 'nt':  # Windows
            pip_cmd = os.path.join('venv', 'Scripts', 'pip')
        else:  # Unix/Linux/Mac
            pip_cmd = os.path.join('venv', 'bin', 'pip')
        
        # Install dependencies
        subprocess.run([pip_cmd, 'install', '-r', 'requirements.txt'], check=True)
        print("✅ Dependencies installed successfully")
        return True
    except Exception as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def create_config_file():
    """Create configuration file"""
    config_content = """# Auto Music Mix Generator Configuration

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-change-this-in-production

# API Keys (add your actual keys here)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SUNO_API_KEY=your_suno_api_key
UDIO_API_KEY=your_udio_api_key

# Database Configuration (if needed)
DATABASE_URL=sqlite:///mixes.db

# File Storage
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216  # 16MB max file size
"""
    
    try:
        with open('.env', 'w') as f:
            f.write(config_content)
        print("✅ Configuration file (.env) created")
        return True
    except Exception as e:
        print(f"❌ Error creating config file: {e}")
        return False

def create_directories():
    """Create necessary directories"""
    directories = ['uploads', 'exports', 'logs', 'templates']
    
    for directory in directories:
        try:
            os.makedirs(directory, exist_ok=True)
            print(f"✅ Created directory: {directory}")
        except Exception as e:
            print(f"❌ Error creating directory {directory}: {e}")

def run_tests():
    """Run basic tests"""
    try:
        print("🧪 Running basic tests...")
        result = subprocess.run([sys.executable, 'demo.py'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Basic tests passed")
            return True
        else:
            print("❌ Basic tests failed")
            print(result.stderr)
            return False
    except Exception as e:
        print(f"❌ Error running tests: {e}")
        return False

def main():
    """Main setup function"""
    print("🎵 Auto Music Mix Generator - Setup")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Create virtual environment
    if not create_virtual_environment():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Create directories
    create_directories()
    
    # Create config file
    create_config_file()
    
    # Run tests
    if run_tests():
        print("\n🎉 Setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Activate virtual environment:")
        if os.name == 'nt':  # Windows
            print("   venv\\Scripts\\activate")
        else:  # Unix/Linux/Mac
            print("   source venv/bin/activate")
        print("2. Run the web interface:")
        print("   python mix_generator_web.py")
        print("3. Or use the CLI:")
        print("   python mix_cli.py --help")
    else:
        print("\n⚠️  Setup completed with warnings. Check the output above.")

if __name__ == "__main__":
    main()