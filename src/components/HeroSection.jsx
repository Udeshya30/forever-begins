import './HeroSection.scss';

export const HeroSection = ({
  title,
  subtitle,
  description,
  imageUrl,
  overlayDark = true,
  children,
}) => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {overlayDark && <div className="hero-overlay"></div>}
      <div className="hero-content">
        {title && <h1 className="hero-title">{title}</h1>}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {description && <p className="hero-description">{description}</p>}
        {children && <div className="hero-children">{children}</div>}
      </div>
    </section>
  );
};

export default HeroSection;
