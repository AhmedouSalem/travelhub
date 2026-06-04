import "./PublicLayout.css";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__container">
        <p>✈ © 2026 TravelHub. All rights reserved.</p>

        <nav className="public-footer__links" aria-label="Legal links">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
        </nav>
      </div>
    </footer>
  );
}