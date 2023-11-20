const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");
const uuid = require("uuid");

router.get("/elevi", async (req, res, next) => {
  try {
    const elevi = await knex("elevi");
    console.log(">>> elevi in get: ", elevi);
    res.send(elevi);
  } catch (error) {
    next(error);
  }
});

router.get("/elevi/:elevId", async (req, res, next) => {
  try {
    const { elevId } = req.params;
    const elevi = await knex("elevi").where({ elevId });
    if (elevi.length === 0) {
      res.status(400);
      throw new Error("Elev not found");
    }
    console.log(`>>> elev in get by elevId ${elevId}: `, elevi);
    res.send(elevi);
  } catch (error) {
    next(error);
  }
});

router.put("/elevi/:elevId", async (req, res, next) => {
  try {
    const { elevId } = req.params;
    const data = { ...req.body };
    const elevi = await knex("elevi").where({ elevId });
    if (elevi.length === 0) {
      res.status(400);
      throw new Error("Elev not found");
    }
    await knex("elevi")
      .where({ elevId })
      .update({ ...data });
    console.log(`>>> elev in put by elevId ${elevId}: `, elevi);
    res.send(elevi);
  } catch (error) {
    next(error);
  }
});

router.post("/elevi", async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.elevId = uuid.v4();
    const elevi = await knex("elevi").insert({ ...data });
    console.log(">>> elev in post: ", elevi);
    res.send(elevi);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
