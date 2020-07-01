import * as signup from './signup';

describe('utils/signup', () => {
  const defaultValues = {
    customerInfo: {
      productType: 'product',
      customerType: 'rbu'
    },
    billingInfo: {
      currency: 'US',
      address: {
        zipcode: '12345',
        country: 'US',
        city: 'Rackspace City',
        street: 'Street 123',
        state: 'Virginia',
        primary: true
      }
    },
    userInfo: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'jodo.1234',
      accountName: 'Test Account',
      email: 'customer@email.com',
      phoneNumber: {
        countryCode: 'US',
        number: '1234567'
      },
      password: 'password'
    }
  };
  describe('formatRequest', () => {
    const formatRequest = (values) => {
      return signup.formatRequest({ ...defaultValues, ...values });
    };
    // top level meaning values that are not nested in the response body
    // this structure for simplifying each test depending on nested keys
    // see RACK_CUSTOMER_SIGNUP_REQUEST or ALT_CUSTOMER_SIGNUP_REQUEST
    test('it should set correct top level userInfo values', () => {
      const result = formatRequest();
      expect(result.accountName).toEqual(defaultValues.userInfo.accountName);
      expect(result.description).toEqual('A Karate (RBU) cloud signup request from the retail site.');
      expect(result.currencyCode).toEqual('US');
    });

    describe('response contact values', () => {
      const result = formatRequest();
      const contact = result.contacts.contact[0];

      test('contact first and last name are set correctly', () => {
        expect(contact.firstName).toEqual(defaultValues.userInfo.firstName);
        expect(contact.lastName).toEqual(defaultValues.userInfo.lastName);
      });

      test('contact addresses are assigned correctly', () => {
        const resultAddress = contact.addresses.address[0];
        expect(resultAddress).toEqual(defaultValues.billingInfo.address);
      });

      test('contact emailAddress is assigned correctly', () => {
        const emailAddress = contact.emailAddresses.emailAddress[0].address;
        expect(emailAddress).toEqual(defaultValues.userInfo.email);
      });

      test('username and password are assigned correctly', () => {
        expect(contact.user.username).toEqual(defaultValues.userInfo.username);
        expect(contact.user.password).toEqual(defaultValues.userInfo.password);
      });

      test('phoneNumber values are assigned correctly', () => {
        const phoneNumber = contact.phoneNumbers.phoneNumber[0];
        expect(phoneNumber.country).toEqual(defaultValues.userInfo.phoneNumber.countryCode);
        expect(phoneNumber.number).toEqual(defaultValues.userInfo.phoneNumber.number);
      });
    });
    ['rackspace', 'rbu', 'onica'].forEach((customerType) => {
      ['other', 'US'].forEach((country) => {
        test(`returns US geography for ${customerType} when country is ${country}`, () => {
          const props = {
            customerInfo: {
              productType: 'product',
              customerType
            },
            billingInfo: {
              currency: 'US',
              address: {
                country
              }
            }
          };
          const result = formatRequest(props);
          expect(result.geography).toEqual('US');
        });
      });
    });
  });

  describe('formatAltCustomer', () => {
    const formatAltCustomer = (type = 'RBU', values) => {
      return signup.formatAltCustomer(type, { ...defaultValues, ...values });
    };

    test('it changes the Business_Unit value based on customer type', () => {
      const result = formatAltCustomer();
      const businessUnit = result.metadata.property.find((value) => value.key === 'Business_Unit');
      expect(businessUnit.value).toEqual('RBU');
    });
  });
});
