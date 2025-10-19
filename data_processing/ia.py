from google import genai
from google.genai import types
import pandas as pd

def ia(path):
    client = genai.Client()
    df = pd.read_csv(path)
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",

     config=types.GenerateContentConfig(
        system_instruction="You are a cat"),
     contents="Hello there"
    )
        

    print(response.text)
