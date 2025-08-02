#!/usr/bin/env python3
"""
Web interface for Auto Music Mix & Play Generator
Flask-based web application for creating music mixes
"""

# from flask import Flask, render_template, request, jsonify, send_file  # Commented out for demo
from auto_music_mixer import AutoMusicMixer, MixConfig, MixingStyle, OutputFormat
import json
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Global mixer instance
mixer = AutoMusicMixer()

@app.route('/')
def index():
    """Main page with mix generator form"""
    return render_template('index.html')

@app.route('/generate_mix', methods=['POST'])
def generate_mix():
    """Generate a mix based on form data"""
    try:
        data = request.get_json()
        
        # Create MixConfig from form data
        config = MixConfig(
            duration_minutes=int(data.get('duration', 30)),
            mood_occasion=data.get('mood_occasion', 'general'),
            source_type=data.get('source_type', 'genre'),
            source_value=data.get('source_value', 'Electronic'),
            mixing_style=MixingStyle(data.get('mixing_style', 'beat_matched')),
            energy_flow=data.get('energy_flow', 'Build gradually to peak at 60%, then ease down'),
            bpm_range=(int(data.get('bpm_min', 120)), int(data.get('bpm_max', 130))),
            avoid_elements=data.get('avoid_elements', []),
            include_elements=data.get('include_elements', []),
            dynamic_adaptation=data.get('dynamic_adaptation', False),
            output_format=OutputFormat(data.get('output_format', 'single_file')),
            output_platform=data.get('output_platform')
        )
        
        # Generate the mix
        mix = mixer.create_mix(config)
        
        return jsonify({
            'success': True,
            'mix': mix,
            'message': f'Successfully created {config.duration_minutes}-minute mix'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/export_mix', methods=['POST'])
def export_mix():
    """Export the generated mix"""
    try:
        data = request.get_json()
        output_format = OutputFormat(data.get('output_format', 'single_file'))
        filename = data.get('filename')
        
        if not mixer.current_mix:
            return jsonify({
                'success': False,
                'error': 'No mix available for export'
            }), 400
        
        result = mixer.export_mix(output_format, filename)
        
        return jsonify({
            'success': True,
            'filename': result,
            'message': f'Mix exported successfully as {result}'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/download_tracklist')
def download_tracklist():
    """Download the tracklist as a text file"""
    if not mixer.current_mix:
        return jsonify({'error': 'No mix available'}), 400
    
    filename = f"tracklist_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    result = mixer.export_mix(OutputFormat.TRACKLIST, filename)
    
    return send_file(filename, as_attachment=True, download_name=filename)

@app.route('/api/presets')
def get_presets():
    """Get predefined mix presets"""
    presets = {
        'workout': {
            'name': 'Workout Mix',
            'duration': 45,
            'mood_occasion': 'workout',
            'source_type': 'genre',
            'source_value': 'EDM, House, Trap',
            'mixing_style': 'beat_matched',
            'bpm_range': [128, 140],
            'avoid_elements': ['slow', 'ballad'],
            'include_elements': ['bass drops', 'energy'],
            'energy_flow': 'Build gradually to peak at 80%, then maintain high energy'
        },
        'chill': {
            'name': 'Chill Vibes',
            'duration': 60,
            'mood_occasion': 'relaxation',
            'source_type': 'genre',
            'source_value': 'Ambient, Lo-fi, Chillhop',
            'mixing_style': 'crossfaded',
            'bpm_range': [70, 90],
            'avoid_elements': ['heavy', 'aggressive'],
            'include_elements': ['atmospheric', 'smooth'],
            'energy_flow': 'Gentle flow with subtle energy variations'
        },
        'party': {
            'name': 'Party Mix',
            'duration': 90,
            'mood_occasion': 'party',
            'source_type': 'genre',
            'source_value': 'Pop, Dance, Hip-hop',
            'mixing_style': 'chopped_edits',
            'bpm_range': [120, 135],
            'avoid_elements': ['instrumental only'],
            'include_elements': ['vocals', 'catchy hooks'],
            'energy_flow': 'High energy throughout with dynamic peaks'
        },
        'focus': {
            'name': 'Focus/Study',
            'duration': 120,
            'mood_occasion': 'focus',
            'source_type': 'genre',
            'source_value': 'Classical, Instrumental, Jazz',
            'mixing_style': 'reverb_washes',
            'bpm_range': [60, 80],
            'avoid_elements': ['vocals', 'distracting'],
            'include_elements': ['melodic', 'calming'],
            'energy_flow': 'Consistent, non-distracting background music'
        }
    }
    
    return jsonify(presets)

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    
    app.run(debug=True, host='0.0.0.0', port=5000)