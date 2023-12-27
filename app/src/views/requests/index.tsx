import React from "react";

// type 1 -> parent to student
// type 2 -> student role
// type 3 -> teacher role

export const Requests = () => {
  return (
    <>
      <h1>Cereri</h1>
      <div className="request">
        <p>
          Pentru cererea de asignare a parintelui cu un elev, completati cererea
          urmatoare.
        </p>
        <button className="btn btn-primary">Cerere parinte {"->"} elev</button>
      </div>
      <div className="request">
        <p>
          Pentru cererea de asignare a rolului de elev, completati cererea
          urmatoare.
        </p>
        <button className="btn btn-primary">Cerere rol elev</button>
      </div>
      <div className="request">
        <p>
          Pentru cererea de asignare a rolului de profesor, completati cererea
          urmatoare.
        </p>
        <button className="btn btn-primary">Cerere rol profesor</button>
      </div>
    </>
  );
};
