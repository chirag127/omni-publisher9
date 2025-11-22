# Import libraries
import os
from dotenv import load_dotenv
from medium_api import Medium

# Load environment variables from .env file
load_dotenv()

# Get RAPIDAPI_KEY from the environment
api_key = os.getenv('RAPIDAPI_KEY')

# Create a `Medium` Object
medium = Medium(api_key)

# Get the `User` Object using "username" and print ID
user = medium.user(username="chirag127")
print(user.user_id)
