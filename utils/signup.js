import _ from 'lodash';
import { ALT_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/altCustomer';
import { RACK_CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/rackspaceCustomer';

export const formatAltCustomer = (type) => {
  ALT_CUSTOMER_SIGNUP_REQUEST.metadata.property.forEach((obj) => {
    if (obj.key === 'Business_Unit') {
      obj.value = type;
    }
  });
  return {
    ...ALT_CUSTOMER_SIGNUP_REQUEST
  };
};

export const formatRequest = (values) => {
  const type = _.get(values, ['customerInfo', 'customerType']);
  const billingCountry = _.get(values, ['billingInfo', 'address', 'country']);
  const template = (
    type !== 'rackspace'
      ? formatAltCustomer(type.toUpperCase())
      : RACK_CUSTOMER_SIGNUP_REQUEST
  );
  return {
    ...template,
    accountName: values.userInfo.accountName,
    externalId: (values.customerInfo.productType).toUpperCase(),
    geography: billingCountry !== 'US' && type === 'onica' ? 'UK' : 'US',
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
