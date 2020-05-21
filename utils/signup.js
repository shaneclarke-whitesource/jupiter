import _ from 'lodash';
import { RBU_SIGNUP_REQUEST } from '../app/signupReqFormat/rbuCustomer';
import { CUSTOMER_SIGNUP_REQUEST } from '../app/signupReqFormat/customer';

export const formatRequest = (values) => {
  const template = (
    _.get(values, ['userInfo', 'customerType', 'isRbu'])
      ? RBU_SIGNUP_REQUEST
      : CUSTOMER_SIGNUP_REQUEST
  );
  return {
    ...template,
    accountName: values.accountName,
    externalId: (values.productType).toUpperCase(),
    serviceLevel: 'MANAGED',
    contacts: {
      contact: [
        {
          firstName: values.firstName,
          lastName: values.lastName,
          title: values.title,
          addresses: {
            address: [
              {
                ...values.address,
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
                country: values.address.country,
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