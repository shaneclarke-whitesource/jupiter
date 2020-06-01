import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, formValueSelector, FormSection } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { ADDRESS_FIELDS } from '../../actions/constants/address';
import Checkbox from '../helix/inputTypes/Checkbox';

export class CustomerType extends React.Component {
  handleChange = (e) => {
    if (e.target.checked) {
      this.populateAddressFields();
    } else {
      this.clearAddressFields();
    }
  };

  populateAddressFields = () => {
    Object.entries(ADDRESS_FIELDS).forEach((entry) => {
      this.props.setAddress(...entry);
    });
  };

  clearAddressFields = () => {
    Object.keys(ADDRESS_FIELDS).forEach((field) => {
      this.props.setAddress(field, '');
    });
  };

  render() {
    const { t, productType } = this.props;
    return (
      <div className="CustomerType-section">
        <div className="hxRow">
          <div className="hxCol hxSpan-6">
            <FormSection name="customerType">
              <Field
                name="isRbu"
                content={t('common:account.customer.isRbu')}
                textField="label"
                id="customer-type"
                component={Checkbox}
                onChange={this.handleChange}
                disabled={productType !== 'aws'}
              />
            </FormSection>
          </div>
        </div>
      </div>
    );
  }
}

CustomerType.propTypes = {
  t: PropTypes.func.isRequired,
  setAddress: PropTypes.func,
  productType: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    country: formValueSelector('signUp')(state, 'address.country'),
    stateSelected: formValueSelector('signUp')(state, 'address.state'),
    productType: formValueSelector('signUp')(state, 'productType')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (field, value) => {
      dispatch(change('signUp', `address.${field}`, value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomerType));
