from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
from bs4 import BeautifulSoup
import requests
import datetime

# Params: vidID (string)
# Return: Formatted english transcript


def getTranscript(vidID):
    transcript_list = YouTubeTranscriptApi.list_transcripts(vidID)
    try:
        return transcript_list.find_transcript(['en']).fetch()
    except NoTranscriptFound:
        lang_code = ''
        for i in transcript_list:
            lang_code = i.language_code
            break
        tr = transcript_list.find_transcript([lang_code]).translate('en')
        return (tr.fetch())

    return


def getTimestampedTranscript(vidID):
    transcript = getTranscript(vidID)
    script = []
    for obj1, obj2 in zip(transcript[::2], transcript[1::2]):
        script.append("[" + str(datetime.timedelta(seconds=obj1['start'])).split(".")[0] + "] " +
                      obj1['text'] + " " + obj2['text'])
    return script


def getRawTranscript(vidID):
    transcript = getTranscript(vidID)
    script = []
    for obj in transcript:
        script.append(obj['text'] + " ")
    return script


def getTitle(vidID):
    url = "https://www.youtube.com/watch?v=" + vidID
    r = requests.get(url)
    info = BeautifulSoup(r.text, "html.parser")
    title = info.find("title").text.replace("- YouTube", "")
    return title


if __name__ == "__main__":
    getTranscript("z6GkLxyIO3o")
