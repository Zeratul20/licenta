import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Loader } from "../../components/helpers/loader";
import { StudentsDropdown } from "../../components/inputs/studentsDropdown";

const getGeneralAvg = (student: any, monthIndex: number) => {
  let generalAvg = 0;
  let generalCount = 0;
  student.grades.forEach((subject: any) => {
    let avg = 0;
    let count = 0;
    subject.grades.forEach((grade: any) => {
      const dateMonth = grade.date.slice(3, 5);
      const dateMonthIndex =
        dateMonth < "09" ? parseInt(dateMonth) + 3 : parseInt(dateMonth) - 9;
      console.log(">>>dateMonth, dateMonthIndex: ", dateMonth, dateMonthIndex);
      if (dateMonthIndex <= monthIndex) {
        console.log(">>>grade: ", grade.value);
        avg += parseInt(grade.value);
        count++;
      }
    });
    console.log(">>>avg, count, month: ", avg, count, monthIndex);
    if (count) {
      generalAvg += Math.round(avg / count);
      generalCount++;
    }
  });
  return (generalAvg / generalCount).toFixed(2) !== "NaN"
    ? generalAvg / generalCount
    : 0;
};

export const Reports: view = ({
  user = observe.user,
  updateReportStudent = update.reports.student,
  reportStudent = observe.reports.student,
  getStudents = get.students,
  getUsers = get.users,
  getParents = get.parents,
}) => {
  if (!user || (user.role !== "student" && user.role !== "parent")) return null;
  const users = getUsers.value();

  const getNameByStudentId = (studentId: string) => {
    const students = getStudents.value();
    const student = students.find(
      (student: any) => student.studentId === studentId
    );
    const user = users.find((user: any) => user.userId === student.userId);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };

  const defaultMonths = [
    "09",
    "10",
    "11",
    "12",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
  ];
  //   const months = [
  //     'sept',
  //     'oct',
  //     'nov',
  //     'dec',
  //     'ian',
  //     'feb',
  //     'mar',
  //     'apr',
  //     'mai',
  //     'iun',
  //   ];
  const currentMonth = new Date().getMonth();
  const currentMonthIndex =
    currentMonth < 8 ? currentMonth + 4 : currentMonth - 8;
  const months = defaultMonths.filter((month, index: number) => {
    if (index <= currentMonthIndex) return true;
    return false;
  });

  if (user.role === "student") {
    const students = getStudents.value();
    const student = students.find(
      (student: any) => student.userId === user.userId
    );
    const studentUser = users.find(
      (user: any) => user.userId === student.userId
    );

    console.log(">>>student: ", student);

    const generalAvgs = months.map((month: string, monthIndex: number) =>
      getGeneralAvg(student, monthIndex)
    );

    console.log(">>>generalAvgs: ", generalAvgs);

    return (
      <div className="object-fit-cover">
        <h1>Rapoarte</h1>
        <h2 style={{ textAlign: "center" }}>
          {studentUser.lastName} {studentUser.firstName}
        </h2>
        <LineChart
          xAxis={[{ data: months, scaleType: "band" }]}
          series={[
            {
              data: generalAvgs,
              //   area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    );
  }

  const parentsState = getParents.value();
  const studentsState = getStudents.value();
  const parentFound = parentsState.find(
    (parent: any) => parent.userId === user.userId
  );
  if (!parentFound) return null;

  const handleClick = (studentId: string) => {
    const studentFound = studentsState.find(
      (student: any) => student.studentId === studentId
    );
    updateReportStudent.set(studentFound);
  };

  const { students: parentStudents } = parentFound;
  const students: any = [];
  console.log(">>>parentStudents: ", parentStudents);
  parentStudents.forEach((studentId: string) => {
    const { firstName, lastName } = getNameByStudentId(studentId);
    students.push({
      studentId,
      firstName,
      lastName,
    });
  });

  if (!reportStudent)
    return (
      <div className="object-fit-cover">
        <h1>Rapoarte</h1>
        <StudentsDropdown students={students} handleClick={handleClick} />
      </div>
    );

  const studentUser = users.find(
    (user: any) => user.userId === reportStudent.userId
  );

  const generalAvgs = months.map((month: string, monthIndex: number) =>
    getGeneralAvg(reportStudent, monthIndex)
  );

  return (
    <div className="object-fit-cover">
      <h1>Rapoarte</h1>
      <StudentsDropdown students={students} handleClick={handleClick} />
      <h2 style={{ textAlign: "center" }}>
        {studentUser.lastName} {studentUser.firstName}
      </h2>
      <LineChart
        xAxis={[{ data: months, scaleType: "band", label: "Luna" }]}
        series={[
          {
            data: generalAvgs,
            label: "Media generala",
            // area: true,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};
