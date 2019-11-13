# jupiter
Rackspace Signup page for Invoice Cart

## Local Development

### Starting up
To start up Jupiter locally, run:
```
yarn install && yarn start
```

### Testing
Jupiter is using the [Jest](https://jestjs.io/docs/en/getting-started) testing suite paired with [Enzyme](https://airbnb.io/enzyme/) for unit tests.
To run tests locally run:
```
yarn test 
# or to display code coverage:
yarn test:coverage
``` 


Alternatively to run a subset of tests you can specify with the command:
```
yarn test -- "SomeTestFile"
# or
yarn test -f "SomeTestFile" -t "test description" 
```


