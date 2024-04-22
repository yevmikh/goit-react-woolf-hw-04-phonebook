import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import Section from './Section/Section';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageData = localStorage.getItem('contacts');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactSubmit = contact => {
    const sameContact = contacts.find(
      e => e.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (sameContact) {
      alert(`${contact.name} is already in Contacts`);
    } else {
      setContacts(prev => [...prev, contact]);
    }
  };

  const handleDeleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div
      style={{
        textTransform: 'uppercase',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid gray',
        borderRadius: '10px',
        margin: '0 auto',
        color: '#010101',
        gap: '10px',
      }}
    >
      <Section title="Phonebook">
        <ContactForm onAddContact={handleContactSubmit} />
      </Section>

      <Section title="Contacts">
        <ContactFilter filter={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
};
