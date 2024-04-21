import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import Section from './Section/Section';

export const App = () => {
  const defState = { contacts: [], filter: '' };
  const [value, setValue] = useState(defState);

  useEffect(() => {
    const localStorageData = localStorage.getItem('contacts');
    if (localStorageData) {
      setValue({ ...value, contacts: JSON.parse(localStorageData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(value.contacts));
  }, [value.contacts]);

  const handleContactSubmit = contact => {
    const sameContact = value.contacts.find(
      e => e.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (sameContact) {
      alert(`${contact.name} is already in Contacts`);
    } else {
      setValue(prev => ({
        ...prev,
        contacts: [...prev.contacts, contact],
      }));
    }
  };

  const handleDeleteContact = contactId => {
    setValue(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  const handleFilterChange = e => {
    setValue({ ...value, filter: e.target.value });
  };

  const getFilteredContacts = value.contacts.filter(contact =>
    contact.name.toLowerCase().includes(value.filter.toLowerCase())
  );

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
        <ContactFilter filter={value.filter} onChange={handleFilterChange} />
        <ContactList
          contacts={getFilteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
};
