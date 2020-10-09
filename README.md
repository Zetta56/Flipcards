# Flipcards
A minimalist flash card website designed for studying, built with the MERN stack.

# Requirements
You must have the following installed:
  1. Node.js
  2. npm
  
# Usage
1. Create the following environment variables:
    ```
    process.env.DATABASEURL=/*Your mongo database's URL*/
    process.env.ACCESS_KEY=/*any string you want (long, random string recommended)*/
    process.env.REFRESH_KEY=/*any string you want (long, random string recommended)*/
    ```
   Environment variables can be created either by making a `.env` file at the root directory or by adding it to your deployment settings if deploying it to a cloud platform, like Heroku.
   
   If you don't have a mongo database, you can make one on [locally](https://docs.mongodb.com/manual/installation/) or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
