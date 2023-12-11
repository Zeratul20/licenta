/**
 * Structure the type of the application's state.
 */
export type State = {
  user: any;
  isLogoutPressed: boolean;
  schedule: {
    isEditPressed: boolean;
    class: any;
  };
  modal: {
    isOpen: boolean;
    formData: any;
  };
  teachers: any;
};
