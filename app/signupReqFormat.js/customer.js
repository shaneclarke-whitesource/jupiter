export const CUSTOMER_SIGNUP_REQUEST = {
  'serviceType': 'SYSOPS',
  'metadata': {
    'property': [
      {
        'value': '192.0.2.10',
        'key': 'ipAddress'
      },
      {
        'value': '277299723',
        'key': 'rackUID'
      },
      {
        'value': 'false',
        'key': 'skipCloudWelcomeEmail'
      },
      {
        'value': 'RBU',
        'key': 'Business_Unit'
      }
    ]
  },
  'accountName': 'TheRandomBusiness',
  'description': 'A Karate (RBU) cloud signup request from the retail site.',
  'skipFraudCheck': true,
  'type': 'CLOUD',
  'termsAndConditions': 'US',
  'acceptTermsAndConditions': true,
  'geography': 'US',
  'defaultRegion': 'SYD',
  'externalId': 'AWS',
  'serviceLevel': '',
  'paymentMethod': {
    'paymentInfo': {
      'notificationOption': 'OPT_IN',
      'paymentTerms': 'NET_30',
      'paymentType': 'INVOICE'
    }
  },
  'businessType': 'BUSINESS',
  'currencyCode': 'USD',
  'contacts': {
    'contact': [
      {
        'firstName': '',
        'lastName': '',
        'addresses': {
          'address': [
            {
              'zipcode': '',
              'country': '',
              'city': '',
              'street': '',
              'state': '',
              'primary': true
            }
          ]
        },
        'emailAddresses': {
          'emailAddress': [
            {
              'address': 'me@rackspace.com',
              'primary': true
            }
          ]
        },
        'roles': {
          'role': [
            'BILLING',
            'PRIMARY'
          ]
        },
        'title': '',
        'user': {
          'password': 'Pass123',
          'username': 'Soph'
        },
        'phoneNumbers': {
          'phoneNumber': [
            {
              'country': '',
              'number': '',
              'category': 'HOME',
              'primary': true
            }
          ]
        }
      }
    ]
  }
};
