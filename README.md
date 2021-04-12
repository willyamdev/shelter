# Shelter - password saver

Shelter is a simple REST API to manage passwords. Simple to configure, edit and deploy. Shelter allows you to save passwords with cryptography(AES-256) and store in a postgres database.

## Motivations
If I could sun up Shelter in one sentence I would say

> "Mistrust is the mother of security."

And this is true, some things were created from mistrust, an example is Bitcoin, Bitcoin was born of mistrust about central banks, and like Bitcoin, Shelter was born from distrust about some password savers.

## Get started

Like I said before, Shelter is simple to configure and deploy, it just needs some environment variables to save important data, postgresql cretendials to connect with database and last but not least a SMTP server to send verification code for two-step authentication.

Requeriments to configure:

- Node.Js environment
- Environment variables
- Postgresql cretendials
- SMTP Server

## Configurations

### Node.Js Environment

Shelter needs a Node.Js enviroment to work because it uses a Node.Js backend framework called [Nest.Js][1] to facilitate maintenance and development with good practices and standards.

### Environment Variables

Shelter needs some enviroment variables to work as expected, you can see all of them and what they do below:

#### SMTP Environment Variables

`SMTP_HOST`
Specifies the smtp host, exemple: "smtp.gmail.com"

`SMTP_PORT`
Specifies the smtp port, exemple: 465

`SMTP_SECURE`
Specifies if the connection with smtp host should use SSL, exemple: false/true

`SMTP_AUTH_USER`
Specifies gmail user, exemple: "mygoogleemail@gmail.com"

`SMTP_AUTH_CLIENT_ID`
Specifies gmail api client id, exemple: "27dd549538aqo23ub62to5ra3m7461ir34esphls.apps.googleusercontent.com"

`SMTP_AUTH_CLIENT_SECRET`
Specifies gmail api client secret, exemple: "TPN30Q0vhEEFRcVlRHRA8"

`SMTP_AUTH_REFRESH_TOKEN`
Specifies gmail api refresh token.

`SMTP_AUTH_ACCESS_TOKEN`
Specifies gmail api access token.

#### Postgresql Credentials Environment Variables

`DATABASE_HOST`
Specifies the database host.

`DATABASE_USERNAME`
Specifies the database username.

`DATABASE_PASSWORD`
Specifies the database password.

`DATABASE`
Specifies the database name.

`DATABASE_SSL`
Specifies if the connection with database should use SSL, exemple: false/true

#### Token JWT Environment Variables

`JWT_SECRET`
Specifies the jwt secret that will be used to assign and validate tokens.

`JWT_EXPIRATION`
Specifies the jwt expiration that will be used to assign and validate tokens.

#### Cryptography Environment Variables

`EMAIL_CODE_SECRET_KEY`
Specifies the secret key to encrypt the verification code that is sent to email users for two-step authentication.

[1]: https://nestjs.com "Nest.Js"