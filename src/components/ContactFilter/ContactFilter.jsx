import moduleCss from './contactFilter.module.css';
const ContactFilter = ({ filter, onChange }) => {
  return (
    <div className={moduleCss.contactFilterForm}>
      <input
        type="text"
        className={moduleCss.contactFilterInput}
        placeholder="Search..."
        value={filter}
        onChange={onChange}
      />
    </div>
  );
};

export default ContactFilter;
