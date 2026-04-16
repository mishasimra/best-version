import { LoaderCircle } from "lucide-react";

export function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, description, action = null }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value }) {
  return (
    <div className="progress">
      <span style={{ width: `${Math.max(0, Math.min(100, value || 0))}%` }} />
    </div>
  );
}

export function Field({ label, hint, error, textarea = false, ...props }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="field">
      <span>{label}</span>
      <Comp {...props} />
      {hint ? <small>{hint}</small> : null}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}

export function Stat({ label, value, helper }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      {helper ? <small>{helper}</small> : null}
    </div>
  );
}

export function EmptyState({ title, description, action = null }) {
  return (
    <Card className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </Card>
  );
}

export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="loading-state">
      <LoaderCircle className="spin" size={24} />
      <span>{label}</span>
    </div>
  );
}
