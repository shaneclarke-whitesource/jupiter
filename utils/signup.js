import _ from 'lodash';
import { ALT_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/altCustomer';
import { RACK_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/rackspaceCustomer';

export const formatAltCustomer = (type, values) => {
  ALT_CUSTOMER_SIGNUP_REQUEST.metadata.property.forEach((obj) => {
    if (obj.key === 'Business_Unit') {
      obj.value = type;
    }
  });
  const address = _.get(values, ['billingInfo', 'address', 'country']);
  if (address.country === 'US') {
    // change to John Nunnington info on how to connect address to correct defaultRegion/country
    ALT_CUSTOMER_SIGNUP_REQUEST.geography = values.billingInfo.address.country;
    ALT_CUSTOMER_SIGNUP_REQUEST.defaultRegion = values.billingInfo.address.state;
  }
  if (type === 'RBU') {
    ALT_CUSTOMER_SIGNUP_REQUEST.defaultRegion = 'SYD';
  }
  return {
    ...ALT_CUSTOMER_SIGNUP_REQUEST,
    description: `A Karate (${type}) cloud signup request from the retail site.`
  };
};

export const formatRequest = (values) => {
  const type = _.get(values, ['customerInfo', 'customerType']);
  const template = (
    type !== 'rackspace'
      ? formatAltCustomer(type.toUpperCase(), values)
      : RACK_CUSTOMER_SIGNUP_REQUEST
  );
  return {
    ...template,
    accountName: values.userInfo.accountName,
    externalId: (values.customerInfo.productType).toUpperCase(),
    serviceLevel: 'MANAGED',
    currencyCode: values.billingInfo.currency.toUpperCase(),
    description: `A Karate (${type.toUpperCase()}) cloud signup request from the retail site.`,
    contacts: {
      contact: [
        {
          firstName: values.userInfo.firstName,
          lastName: values.userInfo.lastName,
          title: values.title,
          addresses: {
            address: [
              {
                ...values.billingInfo.address,
                primary: true
              }
            ]
          },
          emailAddresses: {
            emailAddress: [
              {
                address: values.userInfo.email,
                primary: true
              }
            ]
          },
          phoneNumbers: {
            phoneNumber: [
              {
                country: values.userInfo.phoneNumber.countryCode,
                number: values.userInfo.phoneNumber.number,
                category: 'HOME',
                primary: true
              }
            ]
          },
          user: {
            username: values.userInfo.username,
            password: values.userInfo.password
          },
          roles: template.contacts.contact[0].roles
        }
      ]
    }
  };
};
