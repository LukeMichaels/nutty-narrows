function SectionCard({ heading, eyebrow, children, actions }) {
  return (
    <section className="section-card">
      <div className="section-header">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{heading}</h2>
      </div>
      <div className="section-body">{children}</div>
      {actions && <div className="section-actions">{actions}</div>}
    </section>
  );
}

export default SectionCard;
