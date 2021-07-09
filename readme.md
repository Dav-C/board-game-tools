# Board Game Tools

Board Game Tools is a collection of applications  when playing boardgames!

The UI to be responsive and looks best when viewed on a phone, however it will 
work on almost any screen size. 

**Chrome is the only officially supported browser**

Tools included:
- Player Order Randomizer
- Health Point Tracker
- Dice
- Resource Tracking
- Game Timer
- Draw Bag
- Scoring Calculator

## Install and Run
The steps to get up and running will vary based on your local development 
environment.  PostgreSQL is the default database and will be installed and 
configured automatically if you are using the Docker setup instructions. 
Alternatively, you can use SQLite by making the appropriate changes in 
<code>settings.py</code>.

### Windows
- Clone the repo
- Install PostgreSQL and set up a database with the following settings:
  
  **Database Username = bgtadmin**
  
  **Database Password = devadmin**
  
  **Database Name = bgt_data**
  
- These settings are assumed, but you can change them to whatever you want, 
  just be sure to make the variables in <code>.env.dev</code> match your choices.
- Install requirements.txt with <code>pip install -r requirements.txt</code> 
  Using a virtual environment is recommended.
- Make sure the variable <code>WINDOWS_ENVIRONMENT</code> is set to <code>True</code>.
This will enable the <code>load_dotenv</code> package which will allow variables from
<code>.env.dev</code> to be read.
- from the terminal, run <code>python manage.py migrate</code>
- start the development server with <code>python manage.py runserver 0.0.0.0:8000</code>
- The development server can be stopped with <code>CTRL+C</code>

### Docker
- Clone the repo
- Install docker on your linux system (*WSL2 is compatible*).
- Make sure the variable <code>WINDOWS_ENVIRONMENT</code> is set to <code>False</code>.
- In <code>.env.dev</code> change <code>DB_HOST</code> to <code>db</code>.  Once the docker containers are started
  PostgreSQL and the BoardGameTools application will be on different containers.  This 
  setting must be changed or the two containers won't be able to communicate.
- From the application directory (*the default is board-game-tools*) run 
  <code>docker-compose -f docker-compose.dev.yml up -d --build</code>. This will 
  create images for PostgresSql and the Django application, start the containers,
  migrate the database and stat the django development server.  
- You may need to manually run 
  <code>docker-compose -f docker-compose.dev.yml exec web python manage.py migrate</code>.
- The containers can be stopped with <code>docker-compose -f docker-compose.dev.yml stop</code>.
  
#### Testing the app on a phone (or other local device on the same network)
- Add your local ip to the <code>DJANGO_ALLOWED_HOSTS</code> variable in 
  <code>.env.dev</code>.  separate all IP values with a space.  This is not necessary 
  if you are testing the app from a browser on your local machine, but it is 
  required if you want to access the app from a phone on the same network as the 
  django development server. This applies to both the windows and Docker installation 
  instructions.  
  
- If using docker, all settings and environment variable changes must be made before building the images.  
  If changes are made after building the images, simply rebuild with the same 
  command mentioned above.
  
## Access the app and login
- If you would like to create a superuser before opening the application use the command
  <code>docker-compose -f docker-compose.dev.yml exec web python manage.py createsuperuser</code>
- Using chrome, navigate to <code>127.0.0.1:8000</code> or simply <code>localhost:8000</code>
  to access the login page.  
- From the login page you can login with a previously created superuser or create
  a new account.
- If you are using a mobile device or computer on the same network as the django
  development server, the login page can be accessed in chrome at <code>*your_ip*:8000</code>.
  "your_ip* is the same IP as the computer running the django development server and 
  must be added to <code>DJANGO_ALLOWED_HOSTS</code> in <code>.env.dev</code>


## Notes
- For development purposes, password reset requests generate a text file in 
<code>bgt_app/sent_emails</code>
- Image uploads in the draw bag feature have been disabled.  However, you can easily 
re-enable this feature by uncommenting the sections labeled 
  {#TEMPORARILY DISABLED - DRAW BAG IMAGE UPLOADS#} in <code>draw_bags.html</code>
  




