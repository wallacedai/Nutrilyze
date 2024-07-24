import pandas as pd

class ItemService:
    def __init__(self, data_frame: pd.DataFrame):
        self.df = data_frame

    def get_ingredients_by_barcode(self, barcode: int):
        item_data = self.df[self.df['gtin_upc'] == barcode]
        if not item_data.empty:
            return {"ingredients": item_data['ingredients'].values[0]}
        else:
            return {"error": "Item not found"}
