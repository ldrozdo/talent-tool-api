The application Talent Acquisition Tool is developed for the effective creating and managing boolean queries for LinkedIn and other social networks. It was created as a diploma thesis especially for Talent Acquisition Team in Red Hat Brno.

##How to run the app
For this app, you need to have Keycloak for authentication. 

1.Download or clone the code from github
git clone https://github.com/blahutova/talent-tool-api
1.Set up the Keycloak
  1.Open the Admin Console
  1.Choose or create some realm
  1.In the realm, create the roles for talent tool:
app_admin for admin role
app_user for recruiter role
Create client in realm. 
name: for example talent-tool
client protocol: openid-connect
access type: public
valid redirect URIs: $your_url/* (example: http://localhost:3000/*)
base url: $your_url (example: http://localhost:3000/)
web origins: $your_url (example: http://localhost:3000/)
After saving the client, go to Installation tab for client and select Keycloak OIDC JSON for Format option and click Download.
The downloaded keycloak.json file add to talent-tool-frontend/public folder of the downloaded project.
Set up the backend
Open to config/initializers/cors.rb
Rewrite origins to the future url of your frontend 
Set up the frontend
Open talent-tool-frontend/src/api/ApiHost.js
Rewrite the API_HOST constant to the future url of your backend
