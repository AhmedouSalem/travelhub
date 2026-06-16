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
  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-field__label">
        {label}
      </label>

      <div className="auth-field__control">
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
