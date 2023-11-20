const router = require("express").Router({ mergeParams: true });
const { knex } = require("../services/pg");
const uuid = require("uuid");

router.get("/parinti", async (req, res, next) => {
  try {
    const parinti = await knex("parinti");
    console.log(">>> parinti in get: ", parinti);
    res.send(parinti);
  } catch (error) {
    next(error);
  }
});

router.get("/parinti/:parinteId", async (req, res, next) => {
  try {
    const { parinteId } = req.params;
    const parinti = await knex("parinti").where({ parinteId });
    if (parinti.length === 0) {
      res.status(400);
      throw new Error("Parinte not found");
    }
    console.log(`>>> parinte in get by parinteId ${parinteId}: `, parinti);
    res.send(parinti);
  } catch (error) {
    next(error);
  }
});

router.put("/parinti/:parinteId", async (req, res, next) => {
  try {
    const { parinteId } = req.params;
    const data = { ...req.body };
    const parinti = await knex("parinti").where({ parinteId });
    if (parinti.length === 0) {
      res.status(400);
      throw new Error("Parinte not found");
    }
    await knex("parinti")
      .where({ parinteId })
      .update({ ...data });
    console.log(`>>> parinte in put by parinteId ${parinteId}: `, parinti);
    res.send(parinti);
  } catch (error) {
    next(error);
  }
});

router.put("/parinti/:parinteId/elev/:elevId", async (req, res, next) => {
  try {
    const { parinteId, elevId } = req.params;
    const data = { ...req.body };
    const parinti = await knex("parinti").where({ parinteId });
    if (parinti.length === 0) {
      res.status(400);
      throw new Error("Parinte not found");
    }
    const elev = await knex("elevi").where({ elevId });
    if (elev.length === 0) {
      res.status(400);
      throw new Error(`Elev with id ${elevId} not found`);
    }
    const { elevi } = parinti;
    elevi.push(elevId);
    await knex("parinti").where({ parinteId }).update({ elevi });
    console.log(
      `>>> parinte in put elev by parinteId ${parinteId}, elevId ${elevId}: `,
      parinti
    );
    res.send(parinti);
  } catch (error) {
    next(error);
  }
});

router.post("/parinti", async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.parinteId = uuid.v4();
    const { elevi } = data;
    // let nrOfELeviNotFound = 0;
    for (let elevId of elevi) {
      const elev = await knex("elevi").where({ elevId });
      if (elev.length === 0) {
        // nrOfELeviNotFound++;
        res.status(400);
        throw new Error(`Elev with id ${elevId} not found`);
      }
    }
    const parinti = await knex("parinti").insert({ ...data });
    console.log(">>> parinte in post: ", parinti);
    res.send(parinti);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
