import { Router } from "express";
import { validateRequest } from "../middleware/index.js";
import { cursorSchema, userStatsSchema } from "../common/schemas/index.js";
import { statsService } from "../services/index.js";

const statsController = Router();

const getUsers = (req, res, next) => {
  const { startId = 1, amount = 250, direction = "forward" } = req.query;
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
      if (direction === "forward") {
        if (prevElId === queryStartId) {
          users.splice(0, 1);
          cursor.prevEl = prevElId;
        }
        if (nextElId === startId + amount + 1) {
          users.splice(-2, 2);
          cursor.nextEl = nextElId - 1;
        }
        if (nextElId === startId + amount) {
          users.splice(users.length - 1, 1);
          cursor.nextEl = nextElId;
        }
      }
      if (direction === "backward") {
        if (nextElId === queryStartId) {
          users.splice(-1, 1);
          cursor.nextEl = nextElId;
        }
        if (prevElId === startId - amount) {
          users.splice(0, 1);
          cursor.prevEl = prevElId;
        }
      }
      res.json({
        cursor,
        users,
      });
    })
    .catch(next);
};

const getUserStats = (req, res, next) => {
  const { id } = req.params;
  const { from = 0, to = Date.now() } = req.query;
  statsService
    .getUserStats(id, from, to)
    .then((userStats) => res.json(userStats))
    .catch(next);
};

statsController.get("/users", validateRequest(cursorSchema, "query"), getUsers);
statsController.get(
  "/user/:id",
  validateRequest(userStatsSchema.or("id"), "params"),
  validateRequest(userStatsSchema.not("id"), "query"),
  getUserStats
);

export { statsController };
