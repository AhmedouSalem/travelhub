import { useParams } from "react-router-dom";

export function ServiceDetailPage() {
  const { id } = useParams();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Service detail</h1>
      <p>Service ID : {id}</p>
    </main>
  );
}
