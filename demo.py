#!/usr/bin/env python3
"""
Demo script for Auto Music Mix & Play Generator
Works without external dependencies
"""

from auto_music_mixer import AutoMusicMixer, MixConfig, MixingStyle, OutputFormat

def demo_workout_mix():
    """Demo: Create a workout mix"""
    print("🎵 Demo: Workout Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=30,
        mood_occasion="workout",
        source_type="genre",
        source_value="EDM, House, Trap",
        mixing_style=MixingStyle.BEAT_MATCHED,
        energy_flow="Build gradually to peak at 80%, then maintain high energy",
        bpm_range=(128, 140),
        avoid_elements=["slow", "ballad"],
        include_elements=["bass drops", "energy"],
        dynamic_adaptation=True,
        output_format=OutputFormat.SINGLE_FILE
    )
    
    mix = mixer.create_mix(config)
    print(f"✅ Created {config.duration_minutes}-minute workout mix")
    print(f"📊 Tracks: {len(mix['timestamps'])}")
    print(f"🎵 BPM Range: {config.bpm_range[0]}-{config.bpm_range[1]}")
    
    # Show first few tracks
    print("\n📋 Sample Tracklist:")
    for i, track in enumerate(mix['timestamps'][:5], 1):
        print(f"   {i}. {track['timestamp']} - {track['track_title']} ({track['bpm']} BPM)")
    print()

def demo_chill_mix():
    """Demo: Create a chill mix"""
    print("🎵 Demo: Chill Vibes Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=45,
        mood_occasion="relaxation",
        source_type="genre",
        source_value="Ambient, Lo-fi, Chillhop",
        mixing_style=MixingStyle.CROSSFADED,
        energy_flow="Gentle flow with subtle energy variations",
        bpm_range=(70, 90),
        avoid_elements=["heavy", "aggressive"],
        include_elements=["atmospheric", "smooth"],
        dynamic_adaptation=False,
        output_format=OutputFormat.TRACKLIST
    )
    
    mix = mixer.create_mix(config)
    print(f"✅ Created {config.duration_minutes}-minute chill mix")
    print(f"📊 Tracks: {len(mix['timestamps'])}")
    print(f"🎵 BPM Range: {config.bpm_range[0]}-{config.bpm_range[1]}")
    print(f"🎚️  Mixing Style: {config.mixing_style.value}")
    print()

def demo_ai_generated_mix():
    """Demo: Create an AI-generated mix"""
    print("🎵 Demo: AI-Generated Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=20,
        mood_occasion="creative",
        source_type="ai_generated",
        source_value="Tame Impala meets Daft Punk",
        mixing_style=MixingStyle.REVERB_WASHES,
        energy_flow="Build gradually to peak at 60%, then ease down",
        bpm_range=(120, 128),
        avoid_elements=["vocals"],
        include_elements=["synth", "electronic"],
        dynamic_adaptation=True,
        output_format=OutputFormat.SINGLE_FILE
    )
    
    mix = mixer.create_mix(config)
    print(f"✅ Created {config.duration_minutes}-minute AI-generated mix")
    print(f"📊 Tracks: {len(mix['timestamps'])}")
    print(f"🎵 Style: {config.source_value}")
    print(f"🎚️  Mixing Style: {config.mixing_style.value}")
    print()

def demo_export_formats():
    """Demo: Different export formats"""
    print("🎵 Demo: Export Formats")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    # Create a simple mix first
    config = MixConfig(
        duration_minutes=10,
        mood_occasion="demo",
        source_type="genre",
        source_value="Electronic",
        mixing_style=MixingStyle.BEAT_MATCHED,
        energy_flow="Build gradually to peak at 60%, then ease down",
        bpm_range=(120, 130),
        avoid_elements=[],
        include_elements=[],
        dynamic_adaptation=False,
        output_format=OutputFormat.SINGLE_FILE
    )
    
    mix = mixer.create_mix(config)
    
    # Export in different formats
    print("📁 Exporting in different formats:")
    
    # Single file
    result = mixer.export_mix(OutputFormat.SINGLE_FILE, "demo_mix.mp3")
    print(f"   📄 Single File: {result}")
    
    # Tracklist
    result = mixer.export_mix(OutputFormat.TRACKLIST, "demo_tracklist.txt")
    print(f"   📋 Tracklist: {result}")
    
    # Real-time
    result = mixer.export_mix(OutputFormat.REAL_TIME)
    print(f"   🔄 Real-time: {result}")
    print()

def demo_cli_equivalent():
    """Demo: Show CLI equivalent commands"""
    print("🎵 Demo: CLI Equivalent Commands")
    print("=" * 50)
    
    print("The following CLI commands would create the same mixes:")
    print()
    print("1. Workout Mix:")
    print("   python mix_cli.py --duration 30 --mood workout --genre 'EDM, House, Trap' --bpm 128-140")
    print()
    print("2. Chill Mix:")
    print("   python mix_cli.py --duration 45 --mood chill --genre 'Ambient, Lo-fi, Chillhop' --style crossfaded --bpm 70-90")
    print()
    print("3. AI Generated Mix:")
    print("   python mix_cli.py --duration 20 --source ai_generated --ai-style 'Tame Impala meets Daft Punk' --bpm 120-128")
    print()
    print("4. Using Presets:")
    print("   python mix_cli.py --preset workout --duration 60")
    print("   python mix_cli.py --preset chill --duration 90")
    print()

def main():
    """Run all demos"""
    print("🎵 Auto Music Mix & Play Generator - Demo")
    print("=" * 60)
    print("This demo showcases the core functionality without external dependencies.")
    print()
    
    try:
        demo_workout_mix()
        demo_chill_mix()
        demo_ai_generated_mix()
        demo_export_formats()
        demo_cli_equivalent()
        
        print("🎉 Demo completed successfully!")
        print()
        print("💡 Next Steps:")
        print("   1. Install dependencies: pip install -r requirements.txt")
        print("   2. Run web interface: python mix_generator_web.py")
        print("   3. Use CLI: python mix_cli.py --help")
        print("   4. Check examples: python example_usage.py")
        print()
        print("🔧 Features Demonstrated:")
        print("   ✅ Mix configuration and generation")
        print("   ✅ Multiple mixing styles")
        print("   ✅ Energy flow management")
        print("   ✅ Track filtering and selection")
        print("   ✅ Export formats")
        print("   ✅ Preset configurations")
        print("   ✅ CLI command equivalents")
        
    except Exception as e:
        print(f"❌ Error running demo: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()