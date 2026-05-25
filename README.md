# Auto Music Mix & Play Generator

A versatile, AI-powered system for creating continuous, seamless music mixes suitable for any occasion. Compatible with AI music tools (Suno, Udio), DJ software, and streaming platforms.

## 🎵 Features

### Core Functionality
- **Smart Mix Generation**: Create seamless music mixes from 5 minutes to 3 hours
- **Multiple Source Types**: Use playlists, genres, artists, or AI-generated tracks
- **Advanced Mixing Styles**: Beat-matched, crossfaded, reverb washes, and chopped edits
- **Dynamic Energy Flow**: Intelligent energy progression and BPM management
- **Custom Filtering**: Include/exclude specific elements and instruments
- **Multiple Output Formats**: Single file, real-time playback, or tracklist

### Platform Support
- **AI Music Tools**: Suno, Udio, and custom AI APIs
- **Streaming Platforms**: Spotify, YouTube Music integration
- **DJ Software**: VirtualDJ, Ableton Live compatibility
- **Voice Assistants**: Alexa, Google Assistant integration

### User Interfaces
- **Web Interface**: Beautiful, responsive web application
- **Command Line**: Powerful CLI for automation and scripting
- **API**: RESTful API for integration with other applications

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd auto-music-mixer
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the web interface**:
   ```bash
   python mix_generator_web.py
   ```
   Open your browser to `http://localhost:5000`

### Basic Usage

#### Web Interface
1. Open the web application
2. Choose a preset or configure custom settings
3. Click "Generate Mix"
4. Preview and export your mix

#### Command Line
```bash
# Generate a 45-minute workout mix
python mix_cli.py --duration 45 --mood workout --genre "EDM, House" --bpm 128-135

# Create a chill mix with specific mixing style
python mix_cli.py --duration 60 --mood chill --genre "Ambient, Lo-fi" --style crossfaded --bpm 70-90

# Use preset configuration
python mix_cli.py --preset workout --duration 60
```

## 📋 Configuration Options

### Duration & Context
- **Duration**: 5-180 minutes
- **Mood/Occasion**: workout, party, study, relaxation, focus, etc.

### Music Sources
- **Playlists**: Spotify playlists, YouTube playlists
- **Genres**: Deep House, Nu-Disco, Synthwave, EDM, etc.
- **Artists**: Specific artist collections
- **AI Generated**: Custom AI track generation

### Mixing Techniques
- **Beat-Matched**: Traditional DJ-style transitions
- **Crossfaded**: Smooth crossfades between tracks
- **Reverb Washes**: Atmospheric transitions
- **Chopped Edits**: Dynamic, energetic cuts

### Energy Flow
- **Build to Peak**: Gradual energy increase
- **High Energy**: Consistent high energy throughout
- **Gentle Flow**: Subtle energy variations
- **Dynamic Peaks**: Multiple energy peaks

### Customization
- **BPM Range**: 60-200 BPM
- **Avoid Elements**: vocals, slow, heavy, etc.
- **Include Elements**: bass drops, saxophone, atmospheric, etc.
- **Dynamic Adaptation**: Auto-adjust BPM and energy

## 🎛️ Preset Configurations

### Workout Mix
- **Duration**: 45 minutes
- **Genres**: EDM, House, Trap
- **BPM**: 128-140
- **Style**: Beat-matched transitions
- **Energy**: Build to 80% peak, maintain high energy

### Chill Vibes
- **Duration**: 60 minutes
- **Genres**: Ambient, Lo-fi, Chillhop
- **BPM**: 70-90
- **Style**: Crossfaded transitions
- **Energy**: Gentle flow with subtle variations

### Party Mix
- **Duration**: 90 minutes
- **Genres**: Pop, Dance, Hip-hop
- **BPM**: 120-135
- **Style**: Chopped edits
- **Energy**: High energy throughout with dynamic peaks

### Focus/Study
- **Duration**: 120 minutes
- **Genres**: Classical, Instrumental, Jazz
- **BPM**: 60-80
- **Style**: Reverb washes
- **Energy**: Consistent, non-distracting background

## 🔧 Advanced Usage

### AI Music Generation
```bash
# Generate AI tracks in specific style
python mix_cli.py --duration 30 --source ai_generated --ai-style "Tame Impala meets Daft Punk" --bpm 120-128
```

### Custom Mixing Styles
```bash
# Create a mix with custom energy flow
python mix_cli.py --duration 60 --energy "Build gradually to peak at 70%, then ease down gradually" --style reverb_washes
```

### Export Options
```bash
# Export as tracklist only
python mix_cli.py --duration 45 --mood party --genre "Pop, Dance" --output tracklist

# Export with custom filename
python mix_cli.py --duration 30 --mood workout --genre "EDM" --output single_file --filename "my_workout_mix.mp3"
```

### Integration Examples

#### Spotify API Integration
```python
from auto_music_mixer import AutoMusicMixer, MixConfig

mixer = AutoMusicMixer()
config = MixConfig(
    duration_minutes=45,
    mood_occasion="workout",
    source_type="playlist",
    source_value="spotify:playlist:37i9dQZF1DX76Wlfdnj7AP",
    mixing_style=MixingStyle.BEAT_MATCHED,
    bpm_range=(128, 135),
    output_format=OutputFormat.REAL_TIME,
    output_platform="spotify"
)

mix = mixer.create_mix(config)
```

#### Voice Assistant Integration
```python
# Alexa Skill example
def handle_mix_request(intent):
    duration = intent['slots']['duration']['value']
    mood = intent['slots']['mood']['value']
    
    config = MixConfig(
        duration_minutes=int(duration),
        mood_occasion=mood,
        source_type="genre",
        source_value="Electronic",
        mixing_style=MixingStyle.BEAT_MATCHED,
        bpm_range=(120, 130)
    )
    
    return mixer.create_mix(config)
```

## 🎨 Web Interface Features

### Modern UI
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Preview**: See your mix configuration as you build it
- **Preset Buttons**: Quick access to popular configurations
- **Tag System**: Easy management of include/exclude elements
- **Export Options**: Multiple export formats and platforms

### Interactive Elements
- **Live Tracklist**: Preview generated tracklist with timestamps
- **Energy Visualization**: Visual representation of energy flow
- **BPM Analysis**: Track BPM distribution and compatibility
- **Export Management**: Download mixes and tracklists

## 🔌 API Reference

### RESTful Endpoints

#### Generate Mix
```http
POST /generate_mix
Content-Type: application/json

{
  "duration": 45,
  "mood_occasion": "workout",
  "source_type": "genre",
  "source_value": "EDM, House",
  "mixing_style": "beat_matched",
  "bpm_range": [128, 135],
  "avoid_elements": ["vocals"],
  "include_elements": ["bass drops"],
  "output_format": "single_file"
}
```

#### Export Mix
```http
POST /export_mix
Content-Type: application/json

{
  "output_format": "single_file",
  "filename": "my_mix.mp3"
}
```

#### Get Presets
```http
GET /api/presets
```

## 🛠️ Development

### Project Structure
```
auto-music-mixer/
├── auto_music_mixer.py      # Core mixing engine
├── mix_generator_web.py     # Flask web application
├── mix_cli.py              # Command line interface
├── templates/
│   └── index.html          # Web interface template
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

### Adding New Features

#### Custom Mixing Styles
```python
class CustomMixingStyle(MixingStyle):
    CUSTOM_STYLE = "custom_style"

def _get_transition_duration(self, mixing_style: MixingStyle) -> int:
    durations = {
        # ... existing styles ...
        MixingStyle.CUSTOM_STYLE: 12  # 12 seconds
    }
    return durations.get(mixing_style, 8)
```

#### New Output Formats
```python
class CustomOutputFormat(OutputFormat):
    CUSTOM_FORMAT = "custom_format"

def _export_custom_format(self, filename: str = None) -> str:
    # Custom export logic
    return filename
```

### Testing
```bash
# Run unit tests
python -m pytest tests/

# Run integration tests
python -m pytest tests/integration/

# Run with coverage
python -m pytest --cov=auto_music_mixer tests/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add tests for new features
- Update documentation for API changes
- Use type hints for all functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Suno AI**: For AI music generation capabilities
- **Udio**: For advanced AI music synthesis
- **Spotify**: For playlist and track data
- **Open Source Community**: For audio processing libraries

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@automusicmixer.com

## 🔮 Roadmap

### Upcoming Features
- [ ] **Real-time Collaboration**: Multi-user mix creation
- [ ] **Advanced AI Integration**: More AI music platforms
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Social Features**: Share and discover mixes
- [ ] **Advanced Analytics**: Mix performance insights
- [ ] **Hardware Integration**: DJ controller support

### Version History
- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added web interface and CLI
- **v1.2.0**: Enhanced AI integration and presets
- **v1.3.0**: Real-time playback and streaming support

---

**Happy Mixing! 🎵🎧**
