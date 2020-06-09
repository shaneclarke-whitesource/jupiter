import _ from 'lodash';
import { ALT_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/altCustomer';
import { RACK_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/rackspaceCustomer';

const formatAltCustomer = (type, values) => {
  ALT_CUSTOMER_SIGNUP_REQUEST.metadata.property.forEach((obj) => {
    if (obj.key === 'Business_Unit') {
      obj.value = type;
    }
  });
  const address = _.get(values, ['contacts', 'contact', 'addresses', 'address']);
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
    accountName: values.accountName,
    externalId: (values.customerInfo.productType).toUpperCase(),
    serviceLevel: 'MANAGED',
    currencyCode: values.billingInfo.currency.toUpperCase(),
    contacts: {
      contact: [
        {
          firstName: values.firstName,
          lastName: values.lastName,
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
                address: values.email,
                primary: true
              }
            ]
          },
          phoneNumbers: {
            phoneNumber: [
              {
                country: values.billingInfo.address.country,
                number: values.phoneNumber.number,
                category: 'HOME',
                primary: true
              }
            ]
          },
          user: {
            username: values.username,
            password: values.password
          },
          roles: template.contacts.contact[0].roles
        }
      ]
    }
  };
};
