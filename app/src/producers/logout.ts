export const Logout: producer = ({
  isLogoutPressed = observe.isLogoutPressed,
  updateIsLogoutPressed = update.isLogoutPressed,
  updateUser = update.user,
}) => {
  if (!isLogoutPressed) return;
  updateUser.set({});
  localStorage.removeItem("userIdLicenta");
  console.log("Logout pressed");
  window.location.reload();
  updateIsLogoutPressed.set(false);
};
