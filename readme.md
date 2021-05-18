## Board Game Tools

Board game tools is a collection of small applications to help when playing boardgames!

The app is designed to be responsive and currently looks best when viewed on a 
phone. Use the Chrome dev tools and change the display to iphone for the 
best experience. 

**Chrome is the only officially supported browser**

Tools included:
- Players
- Hp Tracker
- Dice
- Resources
- Game Timer
- Draw Bags (this feature is not complete)
- Scoring Calculator


Install:

- Clone the repo
- install requirements.txt

App usage:

- start the django development server with <code>manage.py runserver</code>
- go to http://127.0.0.1:8000/login/
- click "create account" and create a new account

After creating a new account, you should be automatically routed to 
http://127.0.0.1:8000/home/


- create a new session with the + button in the upper right-hand corner. 
  Tool Session are used to create unique collections of tools as defined 
  by the user.

- open the tool session by clicking on its name

-  once in the tool session, click on the drop down menu at the top of the 
   screen and add a tool to the session. After a tool has been added a button 
   at the bottom of the drop down menu will appear. Click on this button 
   to access the tool.

   
To run the app on a mobile device:

- add the ip address of the local machine running the django development server to the <code>ALLOWED HOSTS</code>
  list in <code>config/settings.py</code>
- start the django development server using the command <code>manage.py runserver 0.0.0.0:8000</code>
- using your preferred device, on the same local network as the django development server, 
  navigate to:http://<code>your ip</code>/login where 'your ip' is the ip address of the computer running 
  the django development server.




