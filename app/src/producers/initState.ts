import axios from "axios";

export const initState: producer = ({
  updateMovies = update.movies,
  updateMovieId = update.movieId,
  updateUserId = update.userId,
  updateUser = update.user,
  updateComments = update.comments,
}) => {

  const userId = localStorage.getItem("userId");

  const getUsers = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/users/${userId}`);
    console.log("getUsers: ", data);
    updateUser.set(data);
  };
  getUsers();
  return;
};
