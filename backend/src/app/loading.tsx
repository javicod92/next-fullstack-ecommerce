export default function Loading() {
  return (
    <div className="skeleton">
      {/* Título */}
      <div className="title"></div>

      {/* Estructura de la tabla */}
      <div className="table">
        {/* Encabezados de tabla */}
        <div className="row header">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        {/* Filas de la tabla */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
