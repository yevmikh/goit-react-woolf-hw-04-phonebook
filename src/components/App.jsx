import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import Section from './Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageData = localStorage.getItem('contacts');
    if (localStorageData) {
      this.setState({ contacts: JSON.parse(localStorageData) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleContactSubmit = contact => {
    const { contacts } = this.state;
    const sameContact = contacts.find(
      e => e.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (sameContact) {
      alert(`${contact.name} is already in Contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

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
          <ContactForm onAddContact={this.handleContactSubmit} />
        </Section>

        <Section title="Contacts">
          <ContactFilter filter={filter} onChange={this.handleFilterChange} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </div>
    );
  }
}
