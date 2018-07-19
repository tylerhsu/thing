# Tyler Hsu's Patient Portal
This is my implementation of option 1, the patient portal.  I've used the provided [boilerplate project](https://github.com/tempuslabs/challenges/tree/master/patient-portal).

## Run the starting point

1. `npm i`
2. `npm run seed`
3. `npm run build`
4. `npm start`

## Directory structure
`/assets` contains stylesheets.

`/client` contains React components and a Redux store.

`/files` is an empty directory for storing patient files.

`/public` is where the code from `/client` is compiled to.

`/server` contains an Express server, routes, and the database config.

## Logging in
Running the seed script seeds the database, including some users we've created for you. You can use any user's email address and password to log in to the app as that user.

## Things I've done
### Authentication & authorization
Where appropriate, both server- & client-side routes require the user to be logged in.  API routes e.g. `GET /api/patients` return 401, and html routes e.g. `GET /account` redirect to the login page.  After logging in, you'll be returned to the page you were originally attempting to reach.

Roles are honored as well. For example, attempting `GET /dashboard` (doctor home page) while logged in as a patient will render an error message.

### Persistent sessions
Sessions are persisted in memory on the server.  Log in, visit an access-restricted page such as `/dashboard`, then refresh the page.  Observe that you are still logged in.  Use the "log out" link in the nav bar (or restart the server) to log out.

### Replace dummy data with api requests
I've replaced uses of hard-coded dummy data on the client-side with api requests that return db records.
