import React, { Component } from 'react';
import style from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component {
  render() {
    const { contactsFilter } = this.props;
    return (
      <div>
        <ul>
          {contactsFilter.length === 0 && <p>There are no contacts found!</p>}
          {contactsFilter.length > 0 &&
            contactsFilter.map(({ id, name, number }) => {
              return (
                <li key={id} className={style.item}>
                  <span className="contact-name">{name + ': '}</span>
                  {number}
                  <button
                    className={style.delete__btn}
                    type="button"
                    onClick={() => this.props.onDelete(id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  contactsFilter: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
