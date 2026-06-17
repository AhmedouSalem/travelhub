import { Link } from "react-router-dom";
import "../../styles/service-breadcrumb.css";

type ServiceBreadcrumbProps = {
  categoryLabel: string;
  title: string;
};

export function ServiceBreadcrumb({
  categoryLabel,
  title,
}: ServiceBreadcrumbProps) {
  return (
    <nav className="service-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Catalog</Link>
      <span aria-hidden="true">›</span>
      <span>{categoryLabel}</span>
      <span aria-hidden="true">›</span>
      <strong>{title}</strong>
    </nav>
  );
}
