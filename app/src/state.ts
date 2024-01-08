/**
 * Structure the type of the application's state.
 */
export type State = {
  user: any;
  isLogoutPressed: boolean;
  schedule: {
    class: any;
    schedule: any;
    teacher: any;
  };
  catalogue: {
    class: any;
    catalogue: any;
    teacher: any;
    student: any;
  };
  modal: {
    isOpen: boolean;
    formData: any;
    isSavePressed: boolean;
  };
  teachers: any;
  subjects: any;
  classes: any;
  schedules: any;
  users: any;
  isStateInitiated: boolean;
};
