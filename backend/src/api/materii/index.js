const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");
const uuid = require("uuid");

router.get("/materii", async (req, res, next) => {
  try {
    const materii = await knex("materii");
    console.log(">>> materii in get: ", materii);
    res.send(materii);
  } catch (error) {
    next(error);
  }
});

router.get("/materii/:materieId", async (req, res, next) => {
  try {
    const { materieId } = req.params;
    const materii = await knex("materii").where({ materieId });
    if (materii.length === 0) {
      res.status(400);
      throw new Error("Materie not found");
    }
    console.log(`>>> materie in get by materieId ${materieId}: `, materii);
    res.send(materii);
  } catch (error) {
    next(error);
  }
});

router.put("/materii/:materieId", async (req, res, next) => {
  try {
    const { materieId } = req.params;
    const data = { ...req.body };
    const materii = await knex("materii").where({ materieId });
    if (materii.length === 0) {
      res.status(400);
      throw new Error("Materie not found");
    }
    await knex("materii")
      .where({ materieId })
      .update({ ...data });
    console.log(`>>> materie in put by materieId ${materieId}: `, materii);
    res.send(materii);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
