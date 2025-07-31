#!/usr/bin/env python3
"""
Command Line Interface for Auto Music Mix & Play Generator
CLI tool for creating music mixes from the command line
"""

import argparse
import json
import sys
from auto_music_mixer import AutoMusicMixer, MixConfig, MixingStyle, OutputFormat

def create_parser():
    """Create command line argument parser"""
    parser = argparse.ArgumentParser(
        description='Auto Music Mix & Play Generator - CLI',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate a 45-minute workout mix
  python mix_cli.py --duration 45 --mood workout --genre "EDM, House" --bpm 128-135

  # Create a chill mix with specific mixing style
  python mix_cli.py --duration 60 --mood chill --genre "Ambient, Lo-fi" --style crossfaded --bpm 70-90

  # Generate AI tracks in specific style
  python mix_cli.py --duration 30 --source ai_generated --style "Tame Impala meets Daft Punk" --bpm 120-128

  # Export as tracklist only
  python mix_cli.py --duration 45 --mood party --genre "Pop, Dance" --output tracklist

  # Use preset configuration
  python mix_cli.py --preset workout --duration 60
        """
    )
    
    # Basic mix parameters
    parser.add_argument('--duration', '-d', type=int, default=30,
                       help='Duration in minutes (default: 30)')
    parser.add_argument('--mood', '-m', type=str, default='general',
                       help='Mood or occasion (e.g., workout, party, study)')
    
    # Source configuration
    parser.add_argument('--source', '-s', type=str, default='genre',
                       choices=['genre', 'playlist', 'artists', 'ai_generated'],
                       help='Source type for tracks')
    parser.add_argument('--genre', '-g', type=str,
                       help='Genre(s) for track selection (comma-separated)')
    parser.add_argument('--playlist', '-p', type=str,
                       help='Playlist ID or name')
    parser.add_argument('--artists', '-a', type=str,
                       help='Artist names (comma-separated)')
    parser.add_argument('--ai-style', type=str,
                       help='AI generation style (e.g., "Tame Impala meets Daft Punk")')
    
    # Mixing configuration
    parser.add_argument('--style', type=str, default='beat_matched',
                       choices=['beat_matched', 'crossfaded', 'reverb_washes', 'chopped_edits'],
                       help='Mixing style')
    parser.add_argument('--energy', type=str, default='Build gradually to peak at 60%, then ease down',
                       help='Energy flow description')
    parser.add_argument('--bpm', type=str, default='120-130',
                       help='BPM range (e.g., 120-130)')
    
    # Filtering
    parser.add_argument('--avoid', type=str, nargs='+',
                       help='Elements to avoid (e.g., vocals, slow)')
    parser.add_argument('--include', type=str, nargs='+',
                       help='Elements to include (e.g., bass drops, saxophone)')
    
    # Output configuration
    parser.add_argument('--output', '-o', type=str, default='single_file',
                       choices=['single_file', 'real_time', 'tracklist'],
                       help='Output format')
    parser.add_argument('--platform', type=str,
                       choices=['spotify', 'youtube', 'local'],
                       help='Output platform')
    parser.add_argument('--filename', '-f', type=str,
                       help='Output filename')
    
    # Presets
    parser.add_argument('--preset', type=str,
                       choices=['workout', 'chill', 'party', 'focus'],
                       help='Use predefined preset configuration')
    
    # Additional options
    parser.add_argument('--dynamic', action='store_true',
                       help='Enable dynamic adaptation')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Verbose output')
    parser.add_argument('--json', action='store_true',
                       help='Output result as JSON')
    
    return parser

def get_preset_config(preset_name):
    """Get preset configuration"""
    presets = {
        'workout': {
            'duration': 45,
            'mood_occasion': 'workout',
            'source_type': 'genre',
            'source_value': 'EDM, House, Trap',
            'mixing_style': 'beat_matched',
            'bpm_range': (128, 140),
            'avoid_elements': ['slow', 'ballad'],
            'include_elements': ['bass drops', 'energy'],
            'energy_flow': 'Build gradually to peak at 80%, then maintain high energy'
        },
        'chill': {
            'duration': 60,
            'mood_occasion': 'relaxation',
            'source_type': 'genre',
            'source_value': 'Ambient, Lo-fi, Chillhop',
            'mixing_style': 'crossfaded',
            'bpm_range': (70, 90),
            'avoid_elements': ['heavy', 'aggressive'],
            'include_elements': ['atmospheric', 'smooth'],
            'energy_flow': 'Gentle flow with subtle energy variations'
        },
        'party': {
            'duration': 90,
            'mood_occasion': 'party',
            'source_type': 'genre',
            'source_value': 'Pop, Dance, Hip-hop',
            'mixing_style': 'chopped_edits',
            'bpm_range': (120, 135),
            'avoid_elements': ['instrumental only'],
            'include_elements': ['vocals', 'catchy hooks'],
            'energy_flow': 'High energy throughout with dynamic peaks'
        },
        'focus': {
            'duration': 120,
            'mood_occasion': 'focus',
            'source_type': 'genre',
            'source_value': 'Classical, Instrumental, Jazz',
            'mixing_style': 'reverb_washes',
            'bpm_range': (60, 80),
            'avoid_elements': ['vocals', 'distracting'],
            'include_elements': ['melodic', 'calming'],
            'energy_flow': 'Consistent, non-distracting background music'
        }
    }
    
    return presets.get(preset_name, {})

def parse_bpm_range(bpm_str):
    """Parse BPM range string (e.g., '120-130')"""
    try:
        if '-' in bpm_str:
            min_bpm, max_bpm = map(int, bpm_str.split('-'))
            return (min_bpm, max_bpm)
        else:
            bpm = int(bpm_str)
            return (bpm, bpm)
    except ValueError:
        print(f"Error: Invalid BPM range '{bpm_str}'. Use format 'min-max' or single value.")
        sys.exit(1)

def create_mix_config(args):
    """Create MixConfig from command line arguments"""
    
    # Start with preset if specified
    if args.preset:
        preset_config = get_preset_config(args.preset)
        # Override preset values with command line arguments
        if args.duration != 30:
            preset_config['duration'] = args.duration
        if args.mood != 'general':
            preset_config['mood_occasion'] = args.mood
        if args.genre:
            preset_config['source_type'] = 'genre'
            preset_config['source_value'] = args.genre
        if args.style != 'beat_matched':
            preset_config['mixing_style'] = args.style
        if args.bpm != '120-130':
            preset_config['bpm_range'] = parse_bpm_range(args.bpm)
        if args.avoid:
            preset_config['avoid_elements'] = args.avoid
        if args.include:
            preset_config['include_elements'] = args.include
        if args.energy != 'Build gradually to peak at 60%, then ease down':
            preset_config['energy_flow'] = args.energy
        
        return MixConfig(
            duration_minutes=preset_config['duration'],
            mood_occasion=preset_config['mood_occasion'],
            source_type=preset_config['source_type'],
            source_value=preset_config['source_value'],
            mixing_style=MixingStyle(preset_config['mixing_style']),
            energy_flow=preset_config['energy_flow'],
            bpm_range=preset_config['bpm_range'],
            avoid_elements=preset_config.get('avoid_elements', []),
            include_elements=preset_config.get('include_elements', []),
            dynamic_adaptation=args.dynamic,
            output_format=OutputFormat(args.output),
            output_platform=args.platform
        )
    
    # Create config from individual arguments
    source_type = args.source
    source_value = ""
    
    if source_type == 'genre':
        source_value = args.genre or "Electronic"
    elif source_type == 'playlist':
        source_value = args.playlist or ""
    elif source_type == 'artists':
        source_value = args.artists or ""
    elif source_type == 'ai_generated':
        source_value = args.ai_style or "Electronic"
    
    return MixConfig(
        duration_minutes=args.duration,
        mood_occasion=args.mood,
        source_type=source_type,
        source_value=source_value,
        mixing_style=MixingStyle(args.style),
        energy_flow=args.energy,
        bpm_range=parse_bpm_range(args.bpm),
        avoid_elements=args.avoid or [],
        include_elements=args.include or [],
        dynamic_adaptation=args.dynamic,
        output_format=OutputFormat(args.output),
        output_platform=args.platform
    )

def print_mix_info(mix, verbose=False):
    """Print mix information"""
    print(f"\n🎵 Auto Music Mix Generated Successfully!")
    print(f"📊 Duration: {mix['config'].duration_minutes} minutes")
    print(f"🎯 Mood: {mix['config'].mood_occasion}")
    print(f"🎼 Source: {mix['config'].source_type} - {mix['config'].source_value}")
    print(f"🎚️  Mixing Style: {mix['config'].mixing_style.value}")
    print(f"⚡ Energy Flow: {mix['config'].energy_flow}")
    print(f"🎵 BPM Range: {mix['config'].bpm_range[0]}-{mix['config'].bpm_range[1]}")
    
    if mix['config'].avoid_elements:
        print(f"❌ Avoid: {', '.join(mix['config'].avoid_elements)}")
    if mix['config'].include_elements:
        print(f"✅ Include: {', '.join(mix['config'].include_elements)}")
    
    print(f"\n📋 Tracklist ({len(mix['timestamps'])} tracks):")
    print("-" * 60)
    
    for i, track in enumerate(mix['timestamps'], 1):
        print(f"{i:2d}. {track['timestamp']} - {track['track_title']} ({track['bpm']} BPM)")
    
    if verbose:
        print(f"\n🔧 Technical Details:")
        print(f"   Total Duration: {mix['total_duration']} seconds")
        print(f"   Created: {mix['created_at']}")
        print(f"   Output Format: {mix['config'].output_format.value}")
        if mix['config'].output_platform:
            print(f"   Output Platform: {mix['config'].output_platform}")

def main():
    """Main CLI function"""
    parser = create_parser()
    args = parser.parse_args()
    
    try:
        # Create mixer instance
        mixer = AutoMusicMixer()
        
        # Create configuration
        config = create_mix_config(args)
        
        if args.verbose:
            print("🔧 Creating mix with configuration:")
            print(f"   Duration: {config.duration_minutes} minutes")
            print(f"   Mood: {config.mood_occasion}")
            print(f"   Source: {config.source_type} - {config.source_value}")
            print(f"   Style: {config.mixing_style.value}")
            print(f"   BPM: {config.bpm_range[0]}-{config.bpm_range[1]}")
            print()
        
        # Generate mix
        print("🎵 Generating your music mix...")
        mix = mixer.create_mix(config)
        
        # Display results
        if args.json:
            print(json.dumps(mix, indent=2, default=str))
        else:
            print_mix_info(mix, args.verbose)
        
        # Export if requested
        if args.output != 'tracklist':
            print(f"\n💾 Exporting mix as {args.output}...")
            result = mixer.export_mix(config.output_format, args.filename)
            print(f"✅ Mix exported: {result}")
        
        return 0
        
    except KeyboardInterrupt:
        print("\n❌ Operation cancelled by user")
        return 1
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        return 1

if __name__ == '__main__':
    sys.exit(main())