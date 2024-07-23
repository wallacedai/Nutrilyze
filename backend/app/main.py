from fastapi import FastAPI
import pandas as pd

app = FastAPI()

# Load your Excel data into a DataFrame
# Make sure to install 'openpyxl' with 'pip install openpyxl' to handle .xlsx files
df = pd.read_excel("../data/ingredients_data.xlsx", usecols=['gtin_upc', 'ingredients'])

@app.get("/")
def read_root():
    return {"message": "Welcome to Nutrilyze backend!"}

@app.get("/item/{barcode}")
def read_item(barcode: str):
    barcode = int(barcode)
    # Search the DataFrame for the barcode (now 'gtin_upc')
    item_data = df[df['gtin_upc'] == barcode]
    if not item_data.empty:
        # Retrieve 'ingredients' since we don't have 'product_name'
        return {"ingredients": item_data['ingredients'].values[0]}
    else:
        return {"error": "Item not found"}
