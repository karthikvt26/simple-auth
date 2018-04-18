# simple-auth

# Node Token Authentication

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@github.com:karthikvt26/simple-auth`
2. Install dependencies: `npm install`
3. Change SECRET in `config.js`
4. Start the server: `node server.js`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/generate_token`. 

```
curl -X POST \
			 http://localhost:8080/api/generate_token \
			 -H 'cache-control: no-cache' \
			 -H 'content-type: application/x-www-form-urlencoded' \
			 -H 'postman-token: 2008fb51-80ed-5d4d-0845-c90cc07340fc'
```

The response of the above request will be as follows

```
{
  "success": true,
  "message": "Enjoy your token!",
  "token": "<token>"
}
```

### Validating user tokens

Send a `GET` request to `http://localhost:8080/api/check_token`.

```
curl -X GET \
       http://localhost:8080/api/check_token \
       -H 'cache-control: no-cache' \
       -H 'x-access-token: <token>'
```

Response:

```
{
  "username": {
    "name": "testuser1"
  },
    "iat": 1524037294,
    "exp": 1524123694
}
```

