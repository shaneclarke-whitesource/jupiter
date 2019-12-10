# jupiter
Rackspace Signup page for Invoice Cart

## Local Development

### Starting up
To start up Jupiter locally, run:
```
yarn install && yarn start
```
To use portal staging API end-points: `staging.portal.rackspace.com/api/`
```css
yarn start --staging
```

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

### Helpful Links
For more information on the invoice sign up process see the [documentation](https://one.rackspace.com/display/manpubcld/Invoice+Sign+Up+Process).
