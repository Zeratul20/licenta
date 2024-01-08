import React from "react";

export const ClassDropdown = ({ classes, handleClick }: any) => {
  console.log("classDropdown classes: ", classes);
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Clasa
      </button>
      <ul className="dropdown-menu">
        {classes.map((classEl: any) => {
          return (
            <li>
              <button
                key={classEl.classId}
                className="dropdown-item"
                onClick={() => handleClick(classEl.classId)}
              >
                {classEl.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
