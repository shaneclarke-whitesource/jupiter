Feature('SignUp-header @smoke');

Scenario('loads correctly', async (I, customerInfo) => {
  I.goToRoot();
  I.see('Rackspace Internal Cart');
  I.see('Customer Information');

  I.assertDeepEqual(await customerInfo.customerInfoLabel(), [
    'Select Customer Type',
    'Select Product'
  ]);
});
