import boto3
import io
import os
import librosa

os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'  

def synthesize_speech(text, voice_id='Arthur', language_code='en-GB', output_format='mp3',
                      engine="neural", sr=22050):
    polly_client = boto3.client('polly')

    response = polly_client.synthesize_speech(VoiceId=voice_id,
                                              OutputFormat=output_format,
                                              LanguageCode=language_code,
                                              Text=text, 
                                              Engine=engine)

    audio_data = response['AudioStream'].read()
    audio_array, sample_rate = librosa.load(io.BytesIO(audio_data), sr=sr)
    
    return audio_array, sample_rate