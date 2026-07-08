import { Link, useNavigate } from "react-router-dom";
import { AuthLogo } from "../components/AuthLogo";
import { AuthTextField } from "../components/AuthTextField";
import "./AuthPage.css";
import { useAuth } from "../../../hooks/useAuth";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/", { replace: true});
    } catch (error) {
      setErrorMessage(
        getAuthErrorMessage(
          error,
          "Unable to create your account. Please check your details.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
            onSubmit={handleSubmit}
          >
            <div className="register-form__row">
              <AuthTextField
                autoComplete="given-name"
                id="register-first-name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                placeholder="e.g. Jane"
                required
                type="text"
                value={formData.firstName}
              />

              <AuthTextField
                autoComplete="family-name"
                id="register-last-name"
                label="Last name"
                name="lastName"
                onChange={handleChange}
                placeholder="e.g. Doe"
                required
                type="text"
                value={formData.lastName}
              />
            </div>

            <AuthTextField
              autoComplete="email"
              id="register-email"
              label="Email address"
              name="email"
              onChange={handleChange}
              placeholder="name@example.com"
              required
              type="email"
              value={formData.email}
            />
            <AuthTextField
              autoComplete="new-password"
              id="register-password"
              label="Password"
              minLength={8}
              name="password"
              onChange={handleChange}
              placeholder="Create a strong password"
              required
              type="password"
              value={formData.password}
            />

            <p className="register-form__hint">
              Must be at least 8 characters long.
            </p>

            {errorMessage && (
              <p className="auth-form__error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              className="auth-submit-button register-submit-button"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
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

            <div>
              <strong>Sarah Jenkins</strong>
              <span>Frequent Traveler</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
