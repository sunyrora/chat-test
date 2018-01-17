import React, { Component } from 'react';
import styles from './Write.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  getChecked = () => {
    return this.state.isChecked;
  }

  toggleCheckboxChange(event) {
    this.setState(({ isChecked }) => (
      {isChecked: !isChecked }
    ));
  }

  render() {
    const { value } = this.props;

    return (
      <div 
        className={styles.checkBox}
      >
        <input
          {...this.props}
          type='checkbox'
          checked={this.state.isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <label>{value}</label>
      </div>
    );
  }
}

export default Checkbox;