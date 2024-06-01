import React from "react";
import * as producers from "./producers";
import { UserRequests } from "./userRequests";
import { DirectorRequests } from "./directorRequests";
import { Forbidden } from "../../components/helpers/forbidden";

// type 1 -> parent to student
// type 2 -> student role
// type 3 -> teacher role

export const Requests: view = ({
  user = observe.user,
}) => {

  if(!user || !user.userId) return <Forbidden />;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Cereri</h1>
      {user.role !== "director" && <UserRequests />}
      {user.role === "director" && <DirectorRequests />}
    </>
  );
};

Requests.producers(Object.values(producers));
