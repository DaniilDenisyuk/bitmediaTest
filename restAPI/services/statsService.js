import dbPool from "../../db/databasePool.js";
const defaultUserFields = ["id", "first_name", "last_name", "gender", "email"];
const defaultStatsFields = ["date", "clicks", "page_views"];

const getUsersWithTotals = async (
  startId = 0,
  amount = 250,
  direction = "forward"
) => {
  const sql = `select ${defaultUserFields.toString()}, sum(us.clicks) as total_clicks,
    sum(us.page_views) as total_page_views from users as u
    left join users_statistics as us on u.id = us.user_id
    group by u.id having u.id ${
      direction === "forward" ? ">=" : "<="
    } ? limit ?`;
  const db = await dbPool.acquire();
  try {
    const res = await db.prepare(sql).all([startId, amount]);
    db.release();
    return res;
  } catch (error) {
    db.release();
    throw error;
  }
};

const getUserStats = async (userId) => {
  const sql = `select ${defaultStatsFields.toString()} from users_statistics where user_id = ?`;
  const db = await dbPool.acquire();
  try {
    const res = await db.prepare(sql).all([userId]);
    db.release();
    return res;
  } catch (error) {
    db.release();
    throw error;
  }
};

export const statsService = {
  getUsersWithTotals,
  getUserStats,
};

export default statsService;
