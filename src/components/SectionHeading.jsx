import './SectionHeading.scss';

export const SectionHeading = ({ title, subtitle, accent = true }) => {
  return (
    <div className="section-heading">
      {accent && <div className="section-heading-accent"></div>}
      <h2 className="section-heading-title">{title}</h2>
      {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
