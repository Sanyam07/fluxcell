import pandas as pd

class IndexManager:

    def __init__(self):

        self._file = '/store/ai/index/meta.csv'

        if Path(self._file).is_file():
            self._df = pd.read_csv(self._file)
        else:
            self._df = pd.DataFrame(
                    columns=[
                        "user_id",
                        "message_id",
                        "channel_id",
                        "station_id"
                    ]
                )

    def add_message(self, message):

        indeces = [
            Index('user-' + message['user_id']),
            Index('channel-' + message['channel_id']),
            Index('station-' + message[' station_id'])
        ]
        
        for index in indeces:
            index.add(message_id, message['message_vec'])


