export default function Loading() {
  return (
    <div className="skeleton">
      <div className="title"></div>

      <div className="table">
        <div className="row header">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>

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
