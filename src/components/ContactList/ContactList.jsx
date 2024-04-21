import moduleCss from './contactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={moduleCss.contactList}>
    {contacts.map(contact => (
      <li className={moduleCss.ContactListItem} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={moduleCss.contactListButton}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
