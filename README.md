# Browser_game
Taking the board game onto the browser

To run the project, open the terminal and type in an appropriate directory: 

```git clone https://github.com/BuildZer0/Browser_game.git```

Go in the directory and create a virtual environment using the following command: 
```
cd Browser_game
virtualenv venv
```

Activate the environment by typing: 

``` source venv/bin/activate```

Install all the dependanices for the project by typing

```pip install -r requirements.txt```

Create the database locally using this command: 

```python manage.py migrate```

Finally, to run the project server: 

```python manage.py runserver```
