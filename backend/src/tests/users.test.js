const axios = require("axios");

describe("GET Users", () => {
  it("should return all users", async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    expect(response.status).toBe(200);
  });
});

describe("GET User", () => {
  it("should return a user", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/users/e54363e7-e71e-4720-8746-b5d36db158d8"
    );
    expect(response.status).toBe(200);
    expect(response.data.email).toBe("razvan.pop@gmail.com");
  });
});

describe("POST User", () => {
  it("should create a user", async () => {
    const response = await axios.post("http://localhost:5000/api/users/signUp", {
      firstName: "UserFN",
      lastName: "UserLN",
      email: "firstName.lastname@gmail.com",
      password: "password",
      phoneNumber: "phoneNumber",
    });
    console.log("Post worked ", response.data);
    expect(response.status).toBe(200);
    expect(response.data.email).toBe("firstName.lastname@gmail.com");
    await axios.delete(`http://localhost:5000/api/users/${response.data.userId}`);
  });
});

describe("PUT User", () => {
  it("should update a user", async () => {
    const newUser = await axios.post("http://localhost:5000/api/users/signUp", {
      firstName: "UserFN",
      lastName: "UserLN",
      email: "firstName.lastname@gmail.com",
      password: "password",
      phoneNumber: "phoneNumber",
    });
    const response = await axios.put(
      `http://localhost:5000/api/users/${newUser.data.userId}`,
      {
        role: "teacher",
      }
    );
    expect(response.status).toBe(200);
    expect(response.data.role).toBe("teacher");
    await axios.delete(`http://localhost:5000/api/users/${newUser.data.userId}`);
  });
});
