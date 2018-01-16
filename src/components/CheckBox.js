import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  getState() {
    return this.state;
  }

  toggleCheckboxChange() {
    this.setState(({ isChecked }) => (
      {isChecked: !isChecked}
    ));
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <label >
        <input
          type='checkbox'
          value={label}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        {label}
      </label>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;