import moduleCss from './section.module.css';

const Section = ({ title, children }) => {
  return (
    <section className={moduleCss.sectionFlex}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default Section;
