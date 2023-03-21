# node-email-server
A Node.js email server built with Nodemailer and MailTrap


# To run the project, follow the instructions below:

- First install the packages needed for the project. You can see them in the `package.json` file
```js
npm install
```
- Second, go to Mailtrap, create an account and get your credentials (user key and password). Create a new file in the root directory `.env` and save the keys there
```
EMAIL=<sender's email address>
USER=<mailtrap user key>
PASSWORD=<mailtrap password>
```
- Finally run the project to start our server using this command:
```
npm start
```
