#!/usr/bin/env python3
"""
Example usage of the Auto Music Mix & Play Generator
Demonstrates various configurations and use cases
"""

from auto_music_mixer import AutoMusicMixer, MixConfig, MixingStyle, OutputFormat
import json

def example_workout_mix():
    """Example: Create a workout mix"""
    print("🎵 Example 1: Workout Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=45,
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
    print()

def example_chill_mix():
    """Example: Create a chill mix"""
    print("🎵 Example 2: Chill Vibes Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=60,
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
    print()

def example_ai_generated_mix():
    """Example: Create an AI-generated mix"""
    print("🎵 Example 3: AI-Generated Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=30,
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
    print()

def example_party_mix():
    """Example: Create a party mix"""
    print("🎵 Example 4: Party Mix")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=90,
        mood_occasion="party",
        source_type="genre",
        source_value="Pop, Dance, Hip-hop",
        mixing_style=MixingStyle.CHOPPED_EDITS,
        energy_flow="High energy throughout with dynamic peaks",
        bpm_range=(120, 135),
        avoid_elements=["instrumental only"],
        include_elements=["vocals", "catchy hooks"],
        dynamic_adaptation=True,
        output_format=OutputFormat.REAL_TIME,
        output_platform="spotify"
    )
    
    mix = mixer.create_mix(config)
    print(f"✅ Created {config.duration_minutes}-minute party mix")
    print(f"📊 Tracks: {len(mix['timestamps'])}")
    print(f"🎵 Platform: {config.output_platform}")
    print()

def example_custom_prompt():
    """Example: Using natural language prompt"""
    print("🎵 Example 5: Natural Language Prompt")
    print("=" * 50)
    
    from auto_music_mixer import create_mix_from_prompt
    
    prompt = """
    Generate a 45-minute workout mix blending Synthwave and EDM. 
    Use beat-matched transitions every 3-4 minutes, peak energy at 80% duration. 
    BPM: 128-135. Include heavy bass drops and no vocals. 
    Output as a downloadable MP3.
    """
    
    mix = create_mix_from_prompt(prompt)
    print(f"✅ Created mix from natural language prompt")
    print(f"📊 Duration: {mix['config'].duration_minutes} minutes")
    print(f"🎵 Genres: {mix['config'].source_value}")
    print()

def example_export_formats():
    """Example: Different export formats"""
    print("🎵 Example 6: Export Formats")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    # Create a simple mix first
    config = MixConfig(
        duration_minutes=15,
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

def example_advanced_configuration():
    """Example: Advanced configuration with custom settings"""
    print("🎵 Example 7: Advanced Configuration")
    print("=" * 50)
    
    mixer = AutoMusicMixer()
    
    config = MixConfig(
        duration_minutes=120,
        mood_occasion="focus",
        source_type="genre",
        source_value="Classical, Instrumental, Jazz",
        mixing_style=MixingStyle.REVERB_WASHES,
        energy_flow="Consistent, non-distracting background music",
        bpm_range=(60, 80),
        avoid_elements=["vocals", "distracting", "heavy"],
        include_elements=["melodic", "calming", "piano"],
        dynamic_adaptation=True,
        output_format=OutputFormat.SINGLE_FILE
    )
    
    mix = mixer.create_mix(config)
    print(f"✅ Created {config.duration_minutes}-minute focus mix")
    print(f"📊 Tracks: {len(mix['timestamps'])}")
    print(f"🎵 Avoid: {', '.join(config.avoid_elements)}")
    print(f"🎵 Include: {', '.join(config.include_elements)}")
    print(f"🎵 Dynamic Adaptation: {config.dynamic_adaptation}")
    print()

def main():
    """Run all examples"""
    print("🎵 Auto Music Mix & Play Generator - Examples")
    print("=" * 60)
    print()
    
    try:
        example_workout_mix()
        example_chill_mix()
        example_ai_generated_mix()
        example_party_mix()
        example_custom_prompt()
        example_export_formats()
        example_advanced_configuration()
        
        print("🎉 All examples completed successfully!")
        print("\n💡 Tips:")
        print("   - Use the web interface for interactive mixing")
        print("   - Use the CLI for automation and scripting")
        print("   - Check the README for more advanced features")
        print("   - Customize the system for your specific needs")
        
    except Exception as e:
        print(f"❌ Error running examples: {str(e)}")
        print("💡 Make sure all dependencies are installed: pip install -r requirements.txt")

if __name__ == "__main__":
    main()