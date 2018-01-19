import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getChecked = () => {
    return this.state.isChecked;
  }

  toggleCheckboxChange() {
    this.setState(({ isChecked }) => (
      {isChecked: !isChecked }
    ));
  }

  handleKeyDown(event) {
    if(event.key === ' ') {
      this.toggleCheckboxChange();
    }
  }

  render() {
    const { value, className, tabIndex } = this.props;

    return (
      <div 
        className={className}
        onKeyDown={this.handleKeyDown}
        id='checkContainer'
        ref={c => this.checkContainer = c}
        tabIndex={tabIndex}
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