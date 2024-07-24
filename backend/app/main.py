from fastapi import FastAPI
from .data_loader import DataLoader
from .item_service import ItemService

class App:
    def __init__(self):
        self.app = FastAPI()
        self.data_loader = DataLoader("./data/ingredients_data.xlsx")
        self.df = self.data_loader.get_data()
        self.item_service = ItemService(self.df)
        self.add_routes()

    def add_routes(self):
        @self.app.get("/")
        def read_root():
            return {"message": "Welcome to Nutrilyze backend!"}

        @self.app.get("/item/{barcode}")
        def read_item(barcode: str):
            barcode = int(barcode)
            return self.item_service.get_ingredients_by_barcode(barcode)

# Create an instance of the App class
app_instance = App()
app = app_instance.app
