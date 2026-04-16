import { Link } from "react-router-dom";
import { BrandLogo } from "../ui/BrandLogo";

export function Footer({ variant = "public" }) {
  return (
    <footer className={`site-footer site-footer-${variant}`}>
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <BrandLogo compact />
          <p>Best Version helps young builders turn growth into visible proof.</p>
        </div>
        <div className="site-footer-links">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/support">Contact / Support</Link>
        </div>
      </div>
      <div className="site-footer-meta">
        <span>(c) 2026 Best Version</span>
        <span>Built for momentum</span>
      </div>
    </footer>
  );
}
