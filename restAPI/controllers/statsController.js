import { Router } from "express";
import { validateRequest } from "../middleware/index.js";
import { cursorSchema, userStatsSchema } from "../common/schemas/index.js";
import { statsService } from "../services/index.js";

const statsController = Router();

const getUsers = (req, res, next) => {
  console.log(req.query);
  const { startId, amount, direction } = req.query;
  // query also for prev and next elements
  let queryStartId = direction === "backward" ? startId + 1 : startId - 1;
  statsService
    .getUsersWithTotals(queryStartId, amount + 2, direction)
    .then((users) => {
      const cursor = {
        prevEl: null,
        nextEl: null,
      };
      //define is there prev and next elements left
      const prevElId = users[0].id;
      const nextElId = users[users.length - 1].id;
      if (prevElId === startId - 1) {
        users.splice(0, 1);
        cursor.prevEl = prevElId;
      }
      if (nextElId === startId + amount) {
        users.splice(users.length - 1, 1);
        cursor.nextEl = nextElId;
      }
      if (direction === "backward" && nextElId === queryStartId) {
        users.splice(users.length - 1, 1);
        cursor.nextEl = nextElId;
      }
      res.json({
        cursor,
        users,
      });
    })
    .catch(next);
};

const getUserStats = (req, res, next) => {
  const { id: userId } = req.params;
  statsService
    .getUserStats(userId)
    .then((userStats) => res.json(userStats))
    .catch(next);
};

statsController.get("/users", validateRequest(cursorSchema, "query"), getUsers);
statsController.get(
  "/user/:id",
  validateRequest(userStatsSchema, "params"),
  getUserStats
);

export { statsController };
