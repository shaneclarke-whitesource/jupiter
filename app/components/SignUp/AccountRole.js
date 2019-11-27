import React from 'react';
import PropTypes from 'prop-types';
import DropDown from '../helix/Dropdown';
import { withTranslation } from 'react-i18next';
import Button from '../helix/buttons/Button';
import Submit from '../helix/buttons/Submit';
import Popover from '../helix/popover/Popover';
import { Field } from 'redux-form';

class AccountRole extends React.Component {
    state = {
      isOpen: null,
      selectedRole: 'Aviator'
    };

  closePopover = (e) => {
    e.preventDefault();
    this.setState({ isOpen: null });
  };

  handleChange = (e) => {
    const translatedRole = this.props.t(`common:account.role.${e.target.value}`);
    this.setState({ selectedRole: translatedRole });
  };

  saveRole = (e) => {
    e.preventDefault();
    this.closePopover();
  };

  render() {
    const { t } = this.props;
    const dropdownData = [
      {
        label: t('common:account.role.aviator'),
        value: 'aviator'
      },
      {
        label: t('common:account.role.navigator'),
        value: 'navigator'
      },
      {
        label: t('common:account.role.serviceBlocks'),
        value: 'serviceBlocks'
      }
    ];
    return (
      <div className="account-role-section">
        <Popover
          title={t('common:account.role.header')}
          btnLabel={t('common:actions.basic.select')}
          id="rolePopover"
          role={this.state.selectedRole}
          isOpen={this.state.isOpen}
        >
          <Popover.Header> {t('common:account.actions.role.choose')}</Popover.Header>
          <Popover.Body>
            <Field
              name="role"
              component={DropDown}
              data={dropdownData}
              valueField="value"
              textField="label"
              label="Select Role"
              id="roleSelectPopover"
              onChange={this.handleChange}
            />
          </Popover.Body>
          <Popover.Footer>
            <Submit
              label={t('common:actions.basic.submit')}
              onClick={this.saveRole}
            />
            <Button
              classNames="cancel-btn hxTertiary"
              label={t('common:actions.basic.cancel')}
              onClick={this.closePopover}
            />
          </Popover.Footer>
        </Popover>
      </div>
    );
  }
}

AccountRole.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(AccountRole);
