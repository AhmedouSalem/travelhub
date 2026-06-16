import { AuthLogo } from "../components/AuthLogo";
import "./AuthPage.css";
import { AuthTextField } from "../components/AuthTextField";
import { Link } from "react-router-dom";
import { AuthFeatureCard } from "../components/AuthFeatureCard";

function EmailIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M4 6.5h16v11H4v-11Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.5 10h11v9h-11v-9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function LoginPage() {
  return (
    <main className="auth-page auth-page--login">
      <section className="auth-page__form-side">
        <AuthLogo />

        <div className="auth-card">
          <div className="auth-card__header">
            <h1>Welcome back</h1>
            <p>
              Enter your credentials to access your bookings and travel
              services.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <AuthTextField
              autoComplete="email"
              icon={<EmailIcon />}
              id="login-email"
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
            />

            <div className="auth-form__password-row">
              <label htmlFor="login-password" className="auth-field__label">
                Password
              </label>

              <Link to="/login" className="auth-form__forget">
                Forgot password?
              </Link>
            </div>

            <AuthTextField
              autoComplete="current-password"
              icon={<LockIcon />}
              id="login-password"
              label=""
              name="password"
              placeholder="••••••••"
              type="password"
            />

            <label className="auth-checkbox">
              <input type="checkbox" />
              <span>Remember me for 30 days</span>
            </label>

            <button className="auth-submit-button" type="submit">
              <span>Sign in to account</span>
              <span aria-hidden="true">→</span>
            </button>

            <div className="auth-divider">
              <span />
              <p>OR CONTINUE WITH</p>
              <span />
            </div>

            <div className="auth-socials">
              <button type="button">
                <span aria-hidden="true">G</span>
                Google
              </button>

              <button type="button">
                <span aria-hidden="true">f</span>
                Facebook
              </button>
            </div>
          </form>
        </div>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register now</Link>
        </p>
      </section>

      <section className="auth-page__visual" aria-label="TravelHub services">
        <AuthFeatureCard />
      </section>
    </main>
  );
}
