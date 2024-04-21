import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import moduleCss from './contactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.props.onAddContact(contact);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={moduleCss.contactForm} onSubmit={this.handleSubmit}>
        <label className={moduleCss.labelName}>
          Name:
          <input
            className={moduleCss.inputName}
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={moduleCss.labelName}>
          Number:
          <input
            className={moduleCss.inputName}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={moduleCss.formButton} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
