import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount(){
    if(localStorage.getItem('contacts')){
      // console.log(JSON.parse(localStorage.getItem('contacts')))
      const checkStorage = JSON.parse(localStorage.getItem('contacts'))
      this.setState({contacts: checkStorage})
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  handleAddContact = contactFromForm => {
    const newContact = { id: nanoid(), ...contactFromForm };
    this.checkNewContact(newContact.name)
      ? alert(`${newContact.name} is already in contact`)
      : this.setState(state => ({
          contacts: [...state.contacts, newContact],
        }));
        // localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  };
  checkNewContact = contactName => {
    return this.state.contacts.some(contact => contact.name === contactName);
  };

  findContacts = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterByName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div
        style={{
          textAlign: 'start',
          padding: '50px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.findContacts} />
        <ContactList
          contactsFilter={filterByName}
          onDelete={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
