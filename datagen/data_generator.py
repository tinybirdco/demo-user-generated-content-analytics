import json
import ndjson
import requests
from faker import Faker
from uuid import uuid4
import random
from datetime import datetime, timedelta
import sys
from time import sleep
import base64
import csv

fake = Faker()

COUNTRY_CODES = ["US", "CA", "ES", "DE", "GB", "FR", "CN", "IN", "BR", "MX"]
COUNTRIES = ["United States", "Canada", "Spain", "Germany",
             "Great Britain", "France", "China", "India", "Brazil", "Mexico"]
CONTINENTS = ["NA", "NA", "EU", "EU", "EU", "EU", "AS", "AS", "SA", "NA"]

with open('../tinybird/.tinyb') as tinyb:
    data = json.load(tinyb)
    TB_TOKEN = data.get('token')
    TB_HOST = data.get('host')

with open('sub_property_ids.txt', 'r') as sub_prop_id_file:
    SUB_PROPERTY_IDS = sub_prop_id_file.read().splitlines()

TRACKS = {}
with open('tracks.csv', 'r') as tracks_file:
    reader = csv.DictReader(tracks_file)
    for row in reader:
        asset_id = row['asset_id']
        video_title = row['video_title']
        TRACKS[asset_id] = [video_title]


def generate_events(eps):
    data = []
    events = random.randint(int(eps*0.75), int(eps*1.25))
    for _ in range(events):
        ts = datetime.utcnow()
        d = random.randint(30, 360)
        sub_property_id = random.choice(SUB_PROPERTY_IDS)
        track_weights = list(int((x+1) ** 1.2) for x in range(len(TRACKS)))

        # Do some different things for our sub_property_ids of interest
        if sub_property_id == '1afd14c1-d046-452f-92c9-1cbb4427becb':
            country = random.choices(list(range(10)), weights=[
                100, 50, 35, 45, 27, 12, 5, 6, 12, 3])[0]
            asset_id = random.choices(
                list(TRACKS.keys()), weights=track_weights)[0]
            video_title = TRACKS[asset_id][0]
        else:
            country = random.choices(list(range(10)), weights=[
                50, 20, 100, 6, 3, 1, 15, 4, 2, 0])[0]
            asset_id = random.choices(
                list(TRACKS.keys()), weights=track_weights[::-1])[0]
            video_title = TRACKS[asset_id][0]

        event = {
            "view_id": str(uuid4()),
            "property_id": str(random.randint(207000, 208000)),
            "view_start": (ts - timedelta(seconds=d)).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            "view_end": ts.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            "events": [
                {
                    "sequence_number": "1",
                    "server_time": "2024-03-08T00:01:49.825029680Z",
                    "viewer_time": "2024-03-08T00:01:48.904Z",
                    "playhead_time": "0s",
                    "type": "playerready"
                },
                {
                    "sequence_number": "3",
                    "server_time": "2024-03-08T00:01:49.825029680Z",
                    "viewer_time": "2024-03-08T00:01:48.956Z",
                    "playhead_time": "0s",
                    "type": "loadstart"
                },
                {
                    "sequence_number": "6",
                    "server_time": "2024-03-08T00:01:49.825029680Z",
                    "viewer_time": "2024-03-08T00:01:49.705Z",
                    "playhead_time": "0s",
                    "type": "viewstart"
                },
                {
                    "sequence_number": "7",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.705Z",
                    "playhead_time": "0s",
                    "type": "play"
                },
                {
                    "sequence_number": "8",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.707Z",
                    "playhead_time": "0s",
                    "type": "waiting"
                },
                {
                    "sequence_number": "10",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.731Z",
                    "playhead_time": "0s",
                    "type": "seeking"
                },
                {
                    "sequence_number": "12",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.852Z",
                    "playhead_time": "0.115s",
                    "type": "seeked"
                },
                {
                    "sequence_number": "13",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.854Z",
                    "playhead_time": "0.115s",
                    "type": "renditionchange",
                    "rendition_info": {
                        "width": "854",
                        "height": "480",
                        "fps": None,
                        "bitrate": "1152800",
                        "codec": "avc1.64001f",
                        "rendition_name": None
                    }
                },
                {
                    "sequence_number": "14",
                    "server_time": "2024-03-08T00:01:51.837679603Z",
                    "viewer_time": "2024-03-08T00:01:49.864Z",
                    "playhead_time": "0.115s",
                    "type": "playing"
                },
                {
                    "sequence_number": "22",
                    "server_time": "2024-03-08T00:02:15.497341851Z",
                    "viewer_time": "2024-03-08T00:02:15.341Z",
                    "playhead_time": "25.514s",
                    "type": "pause"
                },
                {
                    "sequence_number": "23",
                    "server_time": "2024-03-08T00:02:15.497341851Z",
                    "viewer_time": "2024-03-08T00:02:15.349Z",
                    "playhead_time": "25.514s",
                    "type": "ended"
                },
                {
                    "sequence_number": "24",
                    "server_time": "2024-03-08T00:02:25.459840978Z",
                    "viewer_time": "2024-03-08T00:02:15.354Z",
                    "playhead_time": "25.514s",
                    "type": "seeking"
                },
                {
                    "sequence_number": "25",
                    "server_time": "2024-03-08T00:02:25.459840978Z",
                    "viewer_time": "2024-03-08T00:02:15.360Z",
                    "playhead_time": "0s",
                    "type": "seeked"
                },
                {
                    "sequence_number": "26",
                    "server_time": "2024-03-08T00:02:25.459840978Z",
                    "viewer_time": "2024-03-08T00:02:15.360Z",
                    "playhead_time": "0s",
                    "type": "viewdropped"
                }
            ],
            "asn": random.randint(10000, 11000),
            "browser": random.choices(["Chrome", "Firefox", "Safari", "Brave", "Opera"], weights=[100, 50, 20, 3, 2])[0],
            "browser_version": "122.0.0.0",
            "cdn": "multiple",
            "city": fake.city(),
            "continent_code": CONTINENTS[country],
            "country": COUNTRY_CODES[country],
            "country_name": COUNTRIES[country],
            "custom_1": None,
            "custom_2": None,
            "custom_3": None,
            "custom_4": None,
            "custom_5": None,
            "error_type": None,
            "exit_before_video_start": False,
            "experiment_name": None,
            "latitude": float(random.randint(300, 500))/10,
            "longitude": -float(random.randint(600, 1300))/10,
            "max_downscale_percentage": 0.58125,
            "max_upscale_percentage": 0,
            "mux_api_version": "2.1",
            "mux_embed_version": "4.30.0",
            "mux_viewer_id": str(uuid4()),
            "operating_system": random.choices(["macOS", "Windows", "Android", "iOS"], weights=[100, 60, 50, 40])[0],
            "operating_system_version": "10.15.7",
            "page_load_time": random.randint(500, 1000),
            "page_type": None,
            "page_url": fake.url(),
            "playback_success_score": 1,
            "player_autoplay": False,
            "player_error_code": None,
            "player_error_message": None,
            "player_height": random.randint(100, 400),
            "player_instance_id": str(uuid4()),
            "player_language": None,
            "player_mux_plugin_name": "VideoElementMonitor",
            "player_mux_plugin_version": "4.30.0",
            "player_name": None,
            "player_poster": None,
            "player_preload": True,
            "player_remote_played": None,
            "player_software": "mux-player",
            "player_software_version": "2.3.3",
            "player_source_domain": "mux.com",
            "player_source_duration": "25514",
            "player_source_height": 480,
            "player_source_url": "https://stream.mux.com/TY4WPz00HLY9zdPo6DSXxElWxi3BSY1pYugQUHJay00hA.m3u8?redundant_streams=True",
            "player_source_width": 854,
            "player_startup_time": 12,
            "player_version": '',
            "player_view_count": 1,
            "player_width": 359,
            "rebuffer_count": None,
            "rebuffer_duration": None,
            "rebuffer_frequency": None,
            "rebuffer_percentage": None,
            "region": "Ohio",
            "session_id": "4fa0b7eb-6da7-4c5f-a3aa-9d3c53260c43",
            "smoothness_score": 1,
            "source_hostname": "stream.mux.com",
            "source_type": "application/x-mpegurl",
            "startup_time_score": 0.9805123,
            "sub_property_id": sub_property_id,
            "used_fullscreen": False,
            "video_content_type": None,
            "video_duration": None,
            "video_encoding_variant": "937084935437418505",
            "video_id": str(uuid4()),
            "video_language": None,
            "video_producer": None,
            "video_quality_score": 1,
            "video_series": None,
            "video_startup_time": 159,
            "video_title": video_title,
            "video_variant_id": None,
            "video_variant_name": None,
            "view_downscaling_percentage": None,
            "view_max_playhead_position": "25514",
            "view_playing_time": "25399",
            "view_seek_count": 2,
            "view_seek_duration": d,
            "view_session_id": "f3eca9b9-cd48-4e51-af71-3979771a6db6",
            "view_total_content_playback_time": 25399,
            "view_total_downscaling": 14763.169,
            "view_total_upscaling": 0,
            "view_upscaling_percentage": None,
            "viewer_application_engine": "122.0.0.0",
            "viewer_connection_type": None,
            "viewer_device_category": random.choices(["desktop", "phone", "car browser", "tablet", "tv", "wearable", "portable media player", "camera", "console", "feature phone", "peripheral", "smart display", "smart speaker"], weights=[100, 50, 40, 30, 25, 11, 6, 9, 4, 1, 2, 1, 3])[0],
            "viewer_device_manufacturer": random.choice(["Apple", "Dell", "Asus"]),
            "viewer_device_name": None,
            "viewer_experience_score": 0.9932768,
            "viewer_os_architecture": None,
            "viewer_user_agent": fake.user_agent(),
            "viewer_user_id": str(uuid4()),
            "watch_time": d*1000,
            "watched": True,
            "weighted_average_bitrate": 1152800,
            "preroll_ad_asset_hostname": None,
            "preroll_ad_tag_hostname": None,
            "preroll_played": None,
            "preroll_requested": None,
            "requests_for_first_preroll": None,
            "video_startup_preroll_load_time": None,
            "video_startup_preroll_request_time": None,
            "max_request_latency": 221,
            "request_latency": 92,
            "request_throughput": 102460036,
            "stream_type": "on-demand",
            "video_experiments_arr": [],
            "asset_id": asset_id,
            "live_stream_id": None,
            "playback_id": "TY4WPz00HLY9zdPo6DSXxElWxi3BSY1pYugQUHJay00hA",
            "live_stream_latency": None,
            "environment_id": "9nkj2k",
            "viewer_device_model": None,
            "mux_embed": "mux-embed",
            "custom_6": None,
            "custom_7": None,
            "custom_8": None,
            "custom_9": None,
            "custom_10": None,
            "view_drm_type": None,
            "view_dropped_frame_count": 0,
            "view_has_ad": None,
            "video_startup_failure": None,
            "ad_attempt_count": None,
            "ad_break_count": None,
            "ad_break_error_count": None,
            "ad_break_error_percentage": None,
            "ad_error_count": None,
            "ad_error_percentage": None,
            "ad_impression_count": None,
            "ad_startup_error_count": None,
            "ad_startup_error_percentage": None,
            "ad_exit_before_start_count": None,
            "ad_exit_before_start_percentage": None
        }

        event_encoded = {
            "records": [{"data": encode_json_b64(event)}],
            "requestId": str(uuid4()),
            "timestamp": int((ts - datetime(1970, 1, 1)).total_seconds() * 1000)
        }

        data.append(event_encoded)

    return (data)


def encode_json_b64(json_data):
    json_string = json.dumps(json_data)
    json_bytes = json_string.encode('utf-8')
    json_base64 = base64.b64encode(json_bytes)
    b64_string = json_base64.decode('utf-8')

    return (b64_string)


def send_to_tinybird(data):
    r = requests.post(f'{TB_HOST}/v0/events',
                      params={
                          'name': 'mux_data',
                          'token': TB_TOKEN
                      },
                      data=ndjson.dumps(data))

    print(r.status_code)
    print(r.text)


if __name__ == '__main__':
    try:
        eps = int(sys.argv[1])
    except:
        eps = 1
    while True:
        payload = generate_events(eps)
        send_to_tinybird(payload)
        sleep(0.25)
