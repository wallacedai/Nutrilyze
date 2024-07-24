import pandas as pd

class DataLoader:
    def __init__(self, file_path: str):
        self.df = pd.read_excel(file_path, usecols=['gtin_upc', 'ingredients'])

    def get_data(self):
        return self.df

