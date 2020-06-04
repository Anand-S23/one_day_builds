from tkinter import *
from PIL import ImageTk, Image
import requests

# Variables 
HEIGHT = 450
WIDTH = 600

# Format Json data to display
def format_response(weather):
    try:
        name = str(weather['name'])
        desc = str(weather['weather'][0]['description'])
        temp = str(weather['main']['temp'])

        weather_print = f'City: {name} \nDescription: {desc} \nTemprature: {temp}°F'

    except:
        weather_print = 'Not valid, enter city or zip code.'
    
    return weather_print

# Get weather from api and display it
def weather_get(city):
    api_key = '28e01ba69af562e4ae402151737f6b6b'
    url = 'https://api.openweathermap.org/data/2.5/weather'
    params = {'APPID': api_key, 'q': city, 'units': 'imperial'}
    response = requests.get(url, params=params)
    weather = response.json()

    label['text'] = format_response(weather)

# Tkinter + GUI
root = Tk()

canvas = Canvas(root, height=HEIGHT, width=WIDTH)
canvas.pack()

background_image = ImageTk.PhotoImage(Image.open("land.png"))
background_label = Label(root, image=background_image)
background_label.place(x=0, y=0, relwidth=1, relheight=1)

frame = Frame(root, bg='#80c1ff', bd=5)
frame.place(relx=0.5, rely=0.1, relwidth=0.75, relheight=0.1, anchor='n')

entry = Entry(frame, font=40)
entry.place(relwidth=0.65, relheight=1)

button = Button(frame, text='Get Weather', bg='gray', command=lambda: weather_get(entry.get()))
button.place(relx=0.7, relwidth=0.3, relheight=1)

lower_frame = Frame(root, bg='#80c1ff', bd=10)
lower_frame.place(relx=0.5, rely=0.25, relwidth=0.75, relheight=0.6, anchor='n')

label = Label(lower_frame, font=('Arial', 18))
label.place(relwidth=1, relheight=1)

root.mainloop()