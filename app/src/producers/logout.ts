export const Logout: producer = ({
  isLogoutPressed = observe.isLogoutPressed,
  updateIsLogoutPressed = update.isLogoutPressed,
  updateUser = update.user,
}) => {
  if (!isLogoutPressed) return;
  updateUser.set({});
  localStorage.removeItem("userIdLicenta");
  localStorage.removeItem("tokenLicenta");
  console.log("Logout pressed");
  window.location.reload();
  window.location.href = "/";
  updateIsLogoutPressed.set(false);
};
