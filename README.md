# Auth0 Authorization Extension Wrapper

Covers some of the features of Authorization Extension for Auth0.

- Roles
- Permissions
- Users
- Groups

There's nothing about Groups yet; if you need it, create an issue or a PR.

## Usage

No time to make documentation but there's a nice coverage of tests.

```js
import {Auth0Wrapper} from './src';

const client = new Auth0Wrapper({
    auth0ClientId: 'YOUR_CLIENT_ID',
    auth0AuthExtensionUrl: 'YOUR_AUTH_EXTENSION_URL',
    auth0ClientSecret: 'YOUR_CLIENT_SECRET',
    auth0Url: 'YOUR_AUTH0_API_URL',
});

const groups = await client.getGroups();
console.log(groups)
```
