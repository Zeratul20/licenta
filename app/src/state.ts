/**
 * Structure the type of the application's state.
 */
export type State = {
  user: any;
  isLogoutPressed: boolean;
  isTokenExpired: boolean;
  schedule: {
    class: any;
    schedule: any;
    teacher: any;
    student: any;
    isStateInitiated: boolean;
  };
  catalogue: {
    class: any;
    catalogue: any;
    teacher: any;
    student: any;
    absences: any;
    currentPage: number;
    isStateInitiated: boolean;
  };
  modal: {
    isOpen: boolean;
    formData: any;
    isSavePressed: boolean;
  };
  teachers: any;
  subjects: any;
  classes: any;
  students: any;
  schedules: any;
  users: any;
  parents: any;
  isStateInitiated: boolean;
  messages: {
    content: any;
    isStateInitiated: boolean;
    currentPage: number;
  };
  requests: {
    content: any;
    isStateInitiated: boolean;
  };
  classDetails: {
    teachers: any;
    class: any;
    isStateInitiated: boolean;
  };
  classesDetails: {
    nrOfStudents: any;
    isStateInitiated: boolean;
  };
  reports: {
    content: any;
    student: any;
    isStateInitiated: boolean;
  }
};
