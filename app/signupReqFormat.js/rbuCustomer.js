export const RBU_SIGNUP_REQUEST = {
  'serviceType': 'SYSOPS',
  'metadata': {
    'property': [
      {
        'value': '192.0.2.10',
        'key': 'ipAddress'
      },
      {
        'value': '277298293',
        'key': 'rackUID'
      },
      {
        'value': '134.288-8901',
        'key': 'deviceFingerPrint'
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
  'accountName': 'Initech',
  'description': 'A Karate (RBU) cloud signup request from the retail site.',
  'skipFraudCheck': true,
  'type': 'CLOUD',
  'termsAndConditions': 'US',
  'acceptTermsAndConditions': true,
  'geography': 'US',
  'affiliateCodeAndType': {
    'code': 'My Affiliate',
    'type': 'BRC'
  },
  'promoCode': '788',
  'defaultRegion': 'SYD',
  'externalId': 'AWS',
  'serviceLevel': 'MANAGED',
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
        'firstName': 'John',
        'lastName': 'Doe',
        'addresses': {
          'address': [
            {
              'zipcode': '78366',
              'country': 'US',
              'city': 'San Francisco',
              'street': '1 Dezavala Place',
              'state': 'California',
              'primary': true
            }
          ]
        },
        'emailAddresses': {
          'emailAddress': [
            {
              'address': 'demo@example.com',
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
        'suffix': 'Senior',
        'title': 'Mr',
        'user': {
          'password': 'theaLam0123',
          'secretQA': {
            'answer': 'Clay',
            'question': 'What is my name?'
          },
          'username': 'john.doe'
        },
        'phoneNumbers': {
          'phoneNumber': [
            {
              'country': 'US',
              'number': '6758783848',
              'category': 'HOME',
              'primary': true
            }
          ]
        }
      }
    ]
  }
};