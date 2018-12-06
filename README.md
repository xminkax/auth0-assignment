# Auth0 assignment task
## Install
- `npm install`

## Run server and client
from root directory
- `npm run server`
- `npm run client`

## Following commands to run from server/client folders
- `npm lint`
- `npm test`

## Follow up section - what I would improve if it would go on production
- constants in contentfulClient.js SPACE_ID, ACCESS_TOKEN, ENVIRONMENT would be handled differently, it Seems ENVIRONMENT property could be different for prod/local or use completely different ACCESS_TOKEN and SPACE_ID as well
- locale is hardcoded which could be handled via Api requests
- ACCESS_TOKEN is a secret so ideally it would be handled differently than hardcoded in the code, use something like credstash or so
- better error handling and play more around more verbose status codes + messages
- logs + metrics to monitor API requests
