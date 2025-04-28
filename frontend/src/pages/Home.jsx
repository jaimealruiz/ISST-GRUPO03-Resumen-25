// Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFreeDocuments } from "../api/document";
import ResumenList from "../components/ResumenList";
import Loader from "../components/Loader";
import "./Home.css"; // Importamos la hoja de estilos

function Home() {
  const [resumenes, setResumenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFreeDocuments()
      .then(setResumenes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      {/* Bloque principal / hero */}
      <div className="home-container">
        <h1 className="home-title"> Resumen.es</h1>
        <p className="home-subtitle">
          Conquista el conocimiento en minutos.
          <br />
          <span>Resúmenes poderosos, ideas transformadoras.</span>
        </p>

        <div className="home-intro-text">
          <p>📖 ¿No tienes tiempo para leer libros enteros?</p>
          <p>🚀 Aprovecha cada minuto con resúmenes claros y prácticos.</p>
          <ul>
            <li>Lo mejor de los libros de empresa y crecimiento personal.</li>
            <li>Aprende sin perder tiempo.</li>
            <li>Decide si un libro vale la pena antes de comprarlo.</li>
          </ul>
          <p className="mt-4">🔍 Explora ahora y transforma tu aprendizaje.</p>
        </div>

        <Link to="/catalogo" className="home-intro-link">
          🔍 Catálogo
        </Link>
      </div>

      {/* Bloque de "resúmenes gratuitos" */}
      <div className="home-second-container">
        <h2 className="home-second-title">Algunos resúmenes gratuitos</h2>
        {loading ? (
          <Loader />
        ) : resumenes.length > 0 ? (
          <ResumenList resumenes={resumenes} />
        ) : (
          <p className="home-no-resumenes">No hay resúmenes aún.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
