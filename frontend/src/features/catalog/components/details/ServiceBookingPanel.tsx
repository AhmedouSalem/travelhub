import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import "./ServiceBookingPanel.css";

type ServiceBookingPanelProps = {
  price: number;
  available: boolean;
};

export function ServiceBookingPanel({
  price,
  available,
}: ServiceBookingPanelProps) {
  return (
    <aside className="service-booking-sidebar">
      <div className="service-booking-card">
        <p className="service-booking-card__label">Price per unit</p>

        <p className="service-booking-card__price">{formatPrice(price)}</p>

        <p className="service-booking-card__availability">
          {available ? "Available for next flight" : "Currently unavailable"}
        </p>

        <div className="service-booking-card__divider" />

        <div className="service-booking-card__login-box">
          <p>
            Please log in to your account to add this service to your upcoming
            flight.
          </p>

          <Link className="service-booking-card__button" to="/login">
            Login to book
          </Link>
        </div>

        <p className="service-booking-card__register">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </aside>
  );
}
