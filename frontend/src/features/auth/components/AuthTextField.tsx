import type { InputHTMLAttributes, ReactNode } from "react";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  label: string;
};

export function AuthTextField({
  icon,
  label,
  id,
  ...inputProps
}: AuthTextFieldProps) {
  const controlClassName = icon
    ? "auth-field__control"
    : "auth-field__control auth-field__control--plain";

  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-field__label">
        {label}
      </label>

      <div className={controlClassName}>
        {icon && (
          <span className="auth-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <input className="auth-field__input" id={id} {...inputProps} />
      </div>
    </div>
  );
}
