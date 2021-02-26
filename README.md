# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

## Getting started

The project is broken down into a client and server folder.

## Server

### Database

#### Setup

To set-up the database locally, you need to add the database name, testing
database name, user-name and password to variables named DB_NAME,
DB_TEST_NAME, DB_USER and DB_PASS respectively to your local `.env` files.
You will also need to add the JWT_SECRET variable to store the secret key
used to encrypt and decrypt the authentication tokens.
For example:

```bash
DB_NAME=database-name
DB_TEST_NAME=testing-database-name
DB_USER=my-database-username
DB_PASS=my-database-password
JWT_SECRET=secret-key
COOKIES_EXPIRES_MS=cookies-expires-ms
JWT_EXPIRES_MS=jwt-expires-ms
REDIS_URL = redis-url
```

You can then use the `connectDB` and `disconnectDB` functions provided in the
`/server/utils/database.js` to both connect and disconnect from the database
using your personal login information from the `.env` file.

### Redis

### Setup

To set-up the redis locally, you need to follow the below link.
https://www.devglan.com/blog/install-redis-windows-and-mac

And if you have windows machine and "Enable commond doesn't work" Please follow below youtube video
https://www.youtube.com/watch?v=ijL2LHsoA-Q&ab_channel=VICTORYVISUALS

Please follow above link to run redis locally and check with ping command.

#### Usage

In order to perform operations on the user database, the following functions
and static methods are available:

##### registerUser(user)

This function will take a user object (with 'email', 'companyName' and
'password' as properties) as an argument, and will:

- perform input validation,
- check if the user already exists in the database,
- hash the password and
- return a valid authentication token (object with a 'token' property).

```javascript
// Async/Await
const result = await registerUser({
  email: "test@test.com",
  companyName: "testINC",
  password: "thisissupersecure12345",
});

console.log(result); // { token: 'eyJhbGci...' }

// Promises
registerUser({
  email: "test@test.com",
  companyName: "testINC",
  password: "thisissupersecure12345",
}).then((result) => {
  console.log(result); // { token: 'eyJhbGci...' }
});
```

If any of the function steps fails, 'result' will be an error object with the following properties:

```javascript
{
  ok: false,
  status: "500",
  errorMessage: error, // this will vary according to what caused the error.
}
```

##### loginUser(user)

This function will take a user object (with 'email' and 'password' as
properties) as an argument, and will:

- find the user is the database by email,
- validate the hashed passwords and
- return a valid authentication token (object with a 'token' property).

```javascript
// Async/Await
const result = await loginUser({
  email: "test@test.com",
  password: "thisissupersecure12345",
});

console.log(result); // { token: 'eyJhbGci...' }

// Promises
loginUser({
  email: "test@test.com",
  password: "thisissupersecure12345",
}).then((result) => {
  console.log(result); // { token: 'eyJhbGci...' }
});
```

If any of the function steps fails, 'result' will be an error object with the following properties:

```javascript
{
  ok: false,
  status: 401, // depending on the error it could be: 500, 404 or 401.
  errorMessage: '...', // this will change depending to what caused the error.
}
```

If the error was caused by a database malfunction, an additional property
`error` will be added to the error object, holding an object with more
information about the malfunction.

##### Static Methods

The following methods are called on the `User` model itself:

- **User.findAll()**: returns an array with all the users who's `isActive`
  property is set to `true`.
- **User.findByEmail(string)**: returns the user (object) that matches the
  given email.
- **User.findByCompanyName(string)**: returns an array of users who share the
  given `companyName`.
- **User.findDeleted()**: returns an array of users who have their `isActive`
  property set to `false`.

##### Instance Methods

The following methods are called on an instance of a user, for example:

```javascript
// Async/Await
const testUser = await User.findByEmail("test@test.com");
const testCompanyName = await testUser.getCompanyName(); // !!!

// Promises
User.findByEmail("test@test.com")
  .then((testUser) => testUser.getCompanyName()) // !!!
  .then((testCompanyName) => console.log(testCompanyName))
  .catch((error) => console.error(error));
```

- **...isDeleted()**: returns `true` if `isActive` property of user is `false`.
- **...softDelete()**: turns the `isActive` property of user to `false`.
- **...softRecover()**: turns the `isActive` property of user to `true`.
- **...getCompanyName()**: returns the user's `companyName`.
- **...setCompanyName(string)**: sets the user's `companyName` to the given
  string.
- **...resetPassword(string)**: hashes given string and sets the user's
  `password` to be the resulting hash.
