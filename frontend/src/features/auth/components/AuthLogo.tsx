import { Link } from "react-router-dom";

export function AuthLogo() {
  return (
    <Link className="auth-logo" to="/">
      <span className="auth-logo__icon" aria-hidden="true">
        <svg fill="none" height="21" viewBox="0 0 24 24" width="21">
          <path
            d="M4.5 16.5 20 4m0 0-4.5 15-4-6-7 3.5L8 10 20 4Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </span>

      <span>TravelHub</span>
    </Link>
  );
}
