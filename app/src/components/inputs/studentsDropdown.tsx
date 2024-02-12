import React from "react";

export const StudentsDropdown = ({ students, handleClick }: any) => {
  console.log("studentsDropdown students: ", students);
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Elev
      </button>
      <ul className="dropdown-menu">
        {students.map((student: any) => {
          const { studentId, lastName, firstName } = student;
          return (
            <li>
              <button
                key={studentId}
                className="dropdown-item"
                onClick={() => handleClick(studentId)}
              >
                {lastName} {firstName}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
