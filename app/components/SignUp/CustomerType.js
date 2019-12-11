import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { CLEAR_ADDRESS_FIELDS, RBU_ADDRESS_FIELDS } from '../../actions/constants/address';
import Checkbox from '../helix/inputTypes/Checkbox';

class CustomerType extends React.Component {
  handleChange = (e) => {
    if (e.target.checked) {
      this.populateAddressFields();
    } else {
      this.clearAddressFields();
    }
  };

  populateAddressFields = () => {
    Object.keys(RBU_ADDRESS_FIELDS).forEach((field) => {
      this.props.setAddress(field, RBU_ADDRESS_FIELDS[field]);
    });
  };

  clearAddressFields = () => {
    Object.keys(CLEAR_ADDRESS_FIELDS).forEach((field) => {
      this.props.clearAddress(field);
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="customer-type-section">
        <div className="hxRow">
          <div className="hxCol hxSpan-4 hxOffset-1">
            <span className="InputField-label customer-info-header hxRequired">
              {t('common:account.customer.type')}
            </span>
          </div>
          <div className="hxCol hxSpan-6">
            <Field
              name="customerType"
              content={t('common:account.customer.isRbu')}
              textField="label"
              id="customer-type"
              component={Checkbox}
              onChange={this.handleChange}
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
  clearAddress: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    country: formValueSelector('signUp')(state, 'address.country'),
    stateSelected: formValueSelector('signUp')(state, 'address.state')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (field, value) => {
      dispatch(change('signUp', `address.${field}`, value));
    },
    clearAddress: (field) => {
      dispatch(change('signUp', `address.${field}`, ''));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomerType));
