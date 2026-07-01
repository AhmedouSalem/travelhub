import { Link } from "react-router-dom";
import { AuthLogo } from "../components/AuthLogo";
import { AuthTextField } from "../components/AuthTextField";
import "./AuthPage.css";

export function RegisterPage() {
  return (
    <main className="auth-page auth-page--register">
      <section className="auth-page__form-side">
        <AuthLogo />

        <div className="register-panel">
          <div className="register-panel__header">
            <h1>Create an account</h1>
            <p>
              Enter your details to join TravelHub and manage your journey
              services.
            </p>
          </div>

          <form
            className="auth-form register-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="register-form__row">
              <AuthTextField
                autoComplete="given-name"
                id="register-first-name"
                label="First name"
                name="firstName"
                placeholder="e.g. Jane"
                type="text"
              />

              <AuthTextField
                autoComplete="family-name"
                id="register-last-name"
                label="Last name"
                name="lastName"
                placeholder="e.g. Doe"
                type="text"
              />
            </div>

            <AuthTextField
              autoComplete="email"
              id="register-email"
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
            />
            <AuthTextField
              autoComplete="new-password"
              id="register-password"
              label="Password"
              name="password"
              placeholder="Create a strong password"
              type="password"
            />

            <p className="register-form__hint">
              Must be at least 8 characters long.
            </p>

            <button
              className="auth-submit-button register-submit-button"
              type="submit"
            >
              Create account
            </button>
          </form>

          <p className="auth-switch register-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>

      <section
        className="auth-page__visual"
        aria-label="TravelHub travel experience"
      >
        <div className="register-testimonial">
          <p className="register-testimonial__quote">
            <q>
              TravelHub transformed how I experience long-haul flights. Having
              all my services organized in one place makes the journey
              completely stress-free.
            </q>
          </p>

          <div className="register-testimonial__author">
            <span className="register-testimonial__avatar" aria-hidden="true">
              SJ
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
