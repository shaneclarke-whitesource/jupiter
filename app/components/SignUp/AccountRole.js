import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Popover from '../helix/popover/Popover';
import DropDown from '../helix/Dropdown';
import Checkbox from '../helix/Checkbox';

class AccountRole extends React.Component {
  state = {
    isOpen: null,
    selectedRole: 'aviator'
  };

  handleChange = (e) => {
    this.setState({
      selectedRole: e.target.value,
      isOpen: null
    });
  };

  ifServiceBlocks = () => {
    const { t } = this.props;
    if (this.state.selectedRole === 'serviceBlocks') {
      return (
        <div className="serviceBlocks-Checkboxes">
          <Field
            id="manage-and-operate"
            content={t('common:account.role.purchasingManageAndOperate')}
            textField="label"
            name="manage-and-operate"
            component={Checkbox}
          />
          <Field
            id="architect-and-deploy"
            content={t('common:account.role.purchasingArchitectAndDeploy')}
            textField="label"
            name="architect-and-deploy"
            component={Checkbox}
          />
        </div>
      );
    }
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
          id="role-popover"
          role={t(`common:account.role.${this.state.selectedRole}`)}
          isOpen={this.state.isOpen}
        >
          <Popover.Header> {t('common:account.actions.role.choose')}</Popover.Header>
          <Popover.Body>
            <Field
              name="role"
              component={DropDown}
              options={dropdownData}
              valueField="value"
              textField="label"
              label="Select Role"
              id="role-select-popover"
              onChange={this.handleChange}
            />
          </Popover.Body>
        </Popover>
        {this.ifServiceBlocks()}
      </div>
    );
  }
}

AccountRole.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(AccountRole);
