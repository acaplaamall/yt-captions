from youtube_transcript_api import YouTubeTranscriptApi

# Params: vidID (string)
# Return: Formatted english transcript


def getTranscript(vidID):
    transcript = YouTubeTranscriptApi.get_transcript(vidID)
    script = ''
    for obj in transcript:
        script += obj['text'] + '\n'
    return script


if __name__ == "__main__":
    transcript = getTranscript("jPluvSrEnLU")
