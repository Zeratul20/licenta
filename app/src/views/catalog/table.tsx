import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "./style.css";

const manipulateGrades = (grades: any) => {
  if (grades.length === 0) {
    return (
      <div className="text-center">
        <span className="badge ">-</span>
      </div>
    );
  }
  return grades.map((grade: any, index: any) => {
    return (
      <div className="text-center" key={index} style={{ display: "flex" }}>
        <div className="catalogue-content">{grade.value}</div>
        <div className="catalogue-content-dates">/{grade.date}</div>
      </div>
    );
  });
};

const manipulateAbsences = (absences: any) => {
  if (absences.length === 0) {
    return (
      <div className="text-center">
        <span className="badge">-</span>
      </div>
    );
  }
  return absences.map((absence: any, index: number) => {
    return (
      <div className="text-center" key={index} style={{ display: "flex" }}>
        <span className="badge">x/</span>
        <span className="badge sm">{absence}</span>
      </div>
    );
  });
};

export const Table = () => {
  const subjects = [
    "Limba Romana",
    "Limba Engleza",
    "Matematica",
    "Fizica",
    "Chimie",
    "Biologie",
    "Istorie",
    "Geografie",
    "Educatie Fizica",
    "Informatica",
  ];
  const students = [
    {
      data: {
        lastName: "Popescu",
        firstName: "Ion",
      },
      subjects: {
        "Limba Romana": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        "Limba Engleza": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: ["12.11"],
        },
        Matematica: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Fizica: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Chimie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
          ],
          absences: ["5.12", "10.03"],
        },
        Biologie: {
          grades: [],
          absences: [],
        },
        Istorie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
            {
              value: 10,
              date: "08.10",
            },
            {
              value: 7,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Geografie: {
          grades: [
            {
              value: 10,
              date: "08.10",
            },
            {
              value: 10,
              date: "10.11",
            },
            {
              value: 10,
              date: "08.10",
            },
            {
              value: 10,
              date: "10.11",
            },
          ],
          absences: [],
        },
        "Educatie Fizica": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Informatica: {
          grades: [
            {
              value: 10,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
      },
    },
    {
      data: {
        lastName: "Florescu",
        firstName: "Gigel",
      },
      subjects: {
        "Limba Romana": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
          ],
          absences: [],
        },
        "Limba Engleza": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Matematica: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
            {
              value: 7,
              date: "08.10",
            },
          ],
          absences: [],
        },
        Fizica: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
            {
              value: 7,
              date: "08.10",
            },
            {
              value: 6,
              date: "08.10",
            },
            {
              value: 5,
              date: "10.11",
            },
            {
              value: 4,
              date: "08.10",
            },
          ],
          absences: [],
        },
        Chimie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Biologie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Istorie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Geografie: {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        "Educatie Fizica": {
          grades: [
            {
              value: 9,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
        Informatica: {
          grades: [
            {
              value: 7,
              date: "08.10",
            },
            {
              value: 8,
              date: "10.11",
            },
          ],
          absences: [],
        },
      },
    },
  ];
  return (
    <div className="p-5">
      <table className="table table-bordered" style={{ border: "1px" }}>
        <thead>
          <tr>
            <th scope="col" colSpan={2}>
              <div className="text-center">#</div>
            </th>
            <th scope="col" colSpan={1}>
              <div className="text-center">Media generala</div>
            </th>
            {/* <th scope="col" colSpan={1}>
              <div className="text-center"> </div>
            </th> */}
            {subjects.map((subject, index) => {
              return (
                <th scope="col" key={index} colSpan={2}>
                  <div className="text-center">{subject}</div>
                </th>
              );
            })}
          </tr>
          <tr>
            <th scope="col" key={"catalog-name"} colSpan={2}>
              <div className="text-center">Nume</div>
            </th>
            {/* <th scope="col" key={"catalog-name"} colSpan={1}>
              <div className="text-center"> </div>
            </th> */}
            <th scope="col" key={"catalog-name"} colSpan={1}>
              <div className="text-center"> </div>
            </th>
            {subjects.map((subject, index) => {
              return (
                <>
                  <th scope="col" key={index} colSpan={1}>
                    <div className="text-center">Note</div>
                  </th>
                  <th scope="col" key={index} colSpan={1}>
                    <div className="text-center">Absente</div>
                  </th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr key={index}>
                <th scope="row" key={index} colSpan={2}>
                  <div className="text-center">
                    {student.data.lastName} {student.data.firstName}
                  </div>
                </th>
                <td scope="col" key={index} colSpan={1}>
                  {" "}
                </td>
                {subjects.map((subject, index) => {
                  return (
                    <>
                      <td scope="col" key={index} colSpan={1}>
                        {manipulateGrades(student.subjects[subject].grades)}
                      </td>
                      <td scope="col" key={index} colSpan={1}>
                        {manipulateAbsences(student.subjects[subject].absences)}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
