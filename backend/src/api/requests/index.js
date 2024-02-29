const router = require("express").Router({ mergeParams: true });
const { knex } = require("../../services/pg");
const uuid = require("uuid");

router.get("/requests", async (req, res, next) => {
  try {
    const requests = await knex("requests");
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.get("/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const requests = await knex("requests").where({ requestId });
    if (requests.length === 0) {
      res.status(400);
      throw new Error("request not found");
    }
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.get("/requests/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const requests = await knex("requests").where({ userId });
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.put("/requests/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const data = { ...req.body };
    const requests = await knex("requests").where({ requestId });
    if (requests.length === 0) {
      res.status(400);
      throw new Error("request not found");
    }
    await knex("requests")
      .where({ requestId })
      .update({ ...data });
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const data = { ...req.body };
    const requestId = uuid.v4();
    const requests = await knex("requests").insert({ ...data, requestId });
    res.send(requests);
  } catch (error) {
    next(error);
  }
});

router.post("/requests/types/:type", async (req, res, next) => {
  try {
    const { type } = req.params;
    const data = { ...req.body };
    const requestId = uuid.v4();
    const newRequest = {};
    newRequest.requestId = requestId;
    newRequest.userId = data.userId;
    newRequest.type = type;
    newRequest.status = "sent";
    if (type === "1") {
      const { students } = data;
      newRequest.students = students;
    }
    await knex("requests").insert(newRequest);
    res.send(newRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
