# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

## Getting started

The project is broken down into a client and server folder.

### Database Setup

To set-up the database locally, you need to add the database name, your
database user-name and password to variables named DB_NAME, DB_USER and DB_PASS
respectively to your local `.env` files. For example:

```bash
DB_NAME='my-database-name'
DB_USER='my-database-username'
DB_PASS='my-database-password'
```

Then, you can use the `connectDB` and `disconnectDB` functions provided in the
`/server/database/helpers.js` to both connect and disconnect from the database
using your personal login information.
