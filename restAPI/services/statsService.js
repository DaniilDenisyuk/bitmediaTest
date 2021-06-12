import dbPool from "../../db/databasePool.js";
const defaultUserFields = [
  "id",
  "first_name",
  "last_name",
  "gender",
  "ip_address",
  "email",
];
const defaultStatsFields = ["date", "clicks", "page_views"];

const getUsersWithTotals = async (startId, amount, direction) => {
  let sql = `select ${defaultUserFields.toString()}, sum(us.clicks) as total_clicks,
    sum(us.page_views) as total_page_views from users as u
    left join users_statistics as us on u.id = us.user_id
    group by u.id having u.id`;
  if (direction === "forward") sql = `${sql} >= ? limit ?`;
  else
    sql = `select * from (${sql} <= ? order by u.id DESC limit ?) as ss order by id ASC;`;
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

const getUserStats = async (userId, from, to) => {
  const sql = `select ${defaultStatsFields.toString()} from users_statistics where user_id = ? and date >= ? and date <= ?`;
  const db = await dbPool.acquire();
  try {
    const res = await db
      .prepare(sql)
      .all([userId, new Date(from).getTime(), new Date(to).getTime()]);
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
