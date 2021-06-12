import { Pool } from "better-sqlite-pool";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pool = new Pool(path.resolve(__dirname, "./test-task.db"));

export default pool;
