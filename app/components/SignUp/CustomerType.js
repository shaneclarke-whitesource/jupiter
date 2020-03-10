import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';
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
      <div className="customer-type-section">
        <div className="hxRow">
          <div className="hxCol hxSpan-4 hxOffset-1">
            <span className="InputField-label customer-info-header">
              {t('common:account.customer.type')}
            </span>
          </div>
          <div className="hxCol hxSpan-6">
            <Field
              name="isRbu"
              content={t('common:account.customer.isRbu')}
              textField="label"
              id="customer-type"
              component={Checkbox}
              onChange={this.handleChange}
              disabled={productType !== 'aws'}
            />
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
    country: formValueSelector('signUp')(state, 'userInfo.address.country'),
    stateSelected: formValueSelector('signUp')(state, 'userInfo.address.state'),
    productType: formValueSelector('signUp')(state, 'userInfo.productType')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (field, value) => {
      dispatch(change('signUp', `userInfo.address.${field}`, value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomerType));
