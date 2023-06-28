import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  let checkStorage;
  if (localStorage.getItem('contacts')) {
    checkStorage = JSON.parse(localStorage.getItem('contacts'));
  }
  
  useEffect(() => {
    setContacts(checkStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = e => {
    e.preventDefault();
    const { name, number } = e.target;
    const contactData = {
      name: name.value,
      number: number.value,
    };

    const newContact = { id: nanoid(), ...contactData };
    checkNewContact(newContact.name)
      ? alert(`${newContact.name} is already in contact`)
      : setContacts(prevState => {
          return [...prevState, newContact];
        });
  };

  const checkNewContact = contactName => {
    return contacts.some(contact => contact.name === contactName);
  };

  const findContacts = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

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
      <ContactForm addContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter onChange={findContacts} />
      <ContactList
        contactsFilter={filterByName}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
