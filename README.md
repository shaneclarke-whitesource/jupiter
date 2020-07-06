# jupiter
Rackspace Signup page for Invoice Cart

## Local Development

### Starting up
To start up Jupiter locally, run:
```
yarn install
```
To use portal staging API end-points: `staging.portal.rackspace.com/api/`
```
yarn watch
```

To use portal prod flag for `portal.rackspace.com/api`
```
yarn start
```

Upon startup you will be prompted for the cookie value for "__Secure-portal_sessionid"
1. Follow the link provided in the terminal
    * I.E. 
      * `yarn watch` direct to [staging](https://staging.portal.rackspace.com/jupiter)
      * `yarn start` direct to [prod](https://portal.rackspace.com/racker/jupiter)
2. Open browser developer tools and navigate cookie storage:
    * ex. On Chrome it is under the "Application" tab
3. Copy the cookie value for "__Secure-portal_sessionid" and paste into the terminal

Note: The cookie expires, when it does you must restart server and enter the latest cookie value.      

### Production
To run a production build run `yarn build`.

### Testing
Jupiter is using the [Jest](https://jestjs.io/docs/en/getting-started) testing suite paired with [Enzyme](https://airbnb.io/enzyme/) for unit tests.
To run tests locally run:
```
yarn test 
# or to display code coverage:
yarn test:coverage
``` 
We use Jest [snapshot testing](https://jestjs.io/docs/en/snapshot-testing) in order to ensure components are rendering appropriately with the props.
After making changes you must run `yarn test -u` in order to update previously created snapshots. 

To run a subset of tests you can specify with the command:
```
yarn test -- "SomeTestFile"
# or
yarn test -f "SomeTestFile" -t "test description" 
```
### Dependencies
Node v12.16.x

### Helpful Links

Jupiter Internal Cart [docs](https://one.rackspace.com/display/IDPLAT/Jupiter+-+Internal+Cart).

Manual Invoice sign up process [documentation](https://one.rackspace.com/display/manpubcld/Invoice+Sign+Up+Process).

Signup is the API use to create accounts. Some details related to nodes can be found [here:](https://one.rackspace.com/display/SU/Environment+Details?searchId=51G3GLA6J#EnvironmentDetails-Dev-ORD1) 

Admin Api [documentation](https://github.rackspace.com/portal/session/wiki/Admin-API)

Signup Developer guide [documentation](https://pages.github.rackspace.com/IX/internal-docs-signup/api-docs/api-reference/index.html)

Portal Onboarding Resources [documentation](https://etherpad.rax.io/p/portal-onboarding-resources)
