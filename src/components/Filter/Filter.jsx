import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Filter/Filter.module.css';

class Filter extends Component {
  render() {
    return (
      <>
        <label className={style.findContact__label}>
          Find contact by name
          <input
            className={style.findContact__input}
            onChange={this.props.onChange}
            type="text"
            name="find"
          />
        </label>
      </>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
