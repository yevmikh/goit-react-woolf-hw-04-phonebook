import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import moduleCss from './contactForm.module.css';

const defState = {
  name: '',
  number: '',
};

const ContactForm = ({ onAddContact }) => {
  const [contactForm, setContactForm] = useState(defState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setContactForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = contactForm;
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    onAddContact(contact);
    setContactForm(defState);
  };

  return (
    <form className={moduleCss.contactForm} onSubmit={handleSubmit}>
      <label className={moduleCss.labelName}>
        Name:
        <input
          className={moduleCss.inputName}
          type="text"
          name="name"
          value={contactForm.name}
          onChange={handleInputChange}
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
          value={contactForm.number}
          onChange={handleInputChange}
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
};

export default ContactForm;
