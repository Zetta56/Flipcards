# Flipcards
A minimalist flash card website designed for studying, built with the MERN stack.

# Requirements
You must have the following installed:
  1. Node.js
  2. npm
  
# Usage
1. Create the following environment variables in your project's root:
    ```
    DATABASEURL=/*Your mongo database's URL*/
    ACCESS_KEY=/*any string you want (long, random string recommended)*/
    REFRESH_KEY=/*any string you want (long, random string recommended)*/
    ```
   Environment variables can be created either by making a `.env` file at the root directory or by adding it to your deployment settings if deploying it to a cloud platform, like Heroku.
   
   If you don't have a mongo database, you can make one on [locally](https://docs.mongodb.com/manual/installation/) or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Install all necessary dependencies with `npm install`.
   
   Note: You must run `npm install` in both your root directory and client directory.
   
3. Build your front-end client by running `npm run build` in your client directory.

4. Start your server with either `node server.js` or `npm start`.

OPTIONAL: Enable Google OAuth 2.0 by adding the following environment variables:
    ```
    GOOGLE_CLIENTID=/*Your oauth client id*/
    REACT_APP_GOOGLE_CLIENTID=/*Your oauth client id*/
    ```
    
   In order to obtain an oauth client id, you can follow these [instructions](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow), specifically in the Prerequisites section.
   
# Development
To run this site in a development environment, you must follow these steps, in addition to the ones listed above:
1. Create the following environment variables in your client directory:
    ```
    REACT_APP_BACKEND_URL=/*Your server's URL*/
    REACT_APP_GOOGLE_CLIENTID=/*Your oauth client id*/
    ```

2. Run `npm start` in your client directory whenever you start your site.
