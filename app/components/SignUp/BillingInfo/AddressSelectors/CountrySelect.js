import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import DropDown from '../../../helix/inputTypes/Dropdown';
import { listCountries } from '../../../../actions/listCountries';
import { getCountry } from '../../../../actions/getCountry';

class CountrySelect extends React.Component {
  componentDidMount() {
    this.props.getCountries();
  }

  onChange = (e) => {
    this.props.getCountry(e.target.value);
  }

  render() {
    const { countries, t } = this.props;
    const options = _.values(countries).map(({ code, name: countryName }) => {
      return (
        <option key={code} value={code}>
          {countryName}
        </option>
      );
    });
    return (
      <div className="InputField">
        <Field
          name="country"
          component={DropDown}
          valueField="value"
          label={t('account:user.location.country')}
          id="country-select-dropdown"
          onChange={this.onChange}
        >
          {options}
        </Field>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  t: PropTypes.func.isRequired,
  countries: PropTypes.object,
  getCountries: PropTypes.func.isRequired,
  getCountry: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch(listCountries());
    },
    getCountry: (countryCode) => {
      dispatch(getCountry(countryCode));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CountrySelect));
