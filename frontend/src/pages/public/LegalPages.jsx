import { Link } from "react-router-dom";
import { Footer } from "../../components/layout/Footer";
import { BrandLogo } from "../../components/ui/BrandLogo";
import { Button, Card } from "../../components/ui/UI";

function LegalLayout({ title, children }) {
  return (
    <div className="legal-page">
      <header className="landing-nav">
        <Link className="brand" to="/">
          <BrandLogo compact />
        </Link>
        <div>
          <Link to="/login" className="text-link">
            Log in
          </Link>
          <Link to="/signup">
            <Button>Get started</Button>
          </Link>
        </div>
      </header>
      <Card className="legal-card">
        <h1>{title}</h1>
        <div className="stack">{children}</div>
      </Card>
      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        Best Version is built to help you grow through learning, projects, mentorship, and career opportunities. By
        using the platform, you agree to participate respectfully and keep your information accurate.
      </p>
      <p>
        You retain ownership of your content while granting Best Version permission to display it within the platform.
        We may update these terms as the product evolves.
      </p>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        We collect basic account details and usage data to personalize your experience and keep your progress visible.
      </p>
      <p>
        Your data is never sold. You can request data export or deletion by contacting support.
      </p>
    </LegalLayout>
  );
}

export function SupportPage() {
  return (
    <LegalLayout title="Contact & Support">
      <p>Need help? We respond within 24 hours on business days.</p>
      <div className="legal-contact">
        <span>Email: support@bestversion.example</span>
        <span>Instagram: @bestversion</span>
        <span>Community hours: Mon-Fri, 9am-6pm</span>
      </div>
    </LegalLayout>
  );
}
