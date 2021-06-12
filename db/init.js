import dbPool from "./databasePool.js";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fsPromisified = {
  readdir: promisify(fs.readdir.bind(fs)),
  readFile: promisify(fs.readFile.bind(fs)),
};

const tables = ["users", "users_statistics"];
const DBName = path.resolve(__dirname, "test-task.db");
const pathToDBData = path.resolve(__dirname, "initData");
const pathToDBStructure = path.resolve(__dirname, "structure.sql");

const ParseJSONDirFiles = async (dirPath) => {
  const files = await fsPromisified.readdir(dirPath);
  const filesData = await Promise.all(
    files.map(async (file) => {
      const rawData = await fsPromisified.readFile(path.join(dirPath, file));
      return { file, data: JSON.parse(rawData) };
    })
  );
  return filesData;
};

(async () => {
  const db = await dbPool.acquire();
  const checkTablesQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name IN (${tables
    .map(() => "?")
    .toString()})`;
  //check if all tables exists
  const resTables = await db.prepare(checkTablesQuery).all(tables);
  //if not
  if (!resTables || tables.length !== resTables.length) {
    //start parsing data from init files
    let filesData = ParseJSONDirFiles(pathToDBData);
    //run subprocess and write contents of db structure file to sqlite cli
    const child = spawn("sqlite3", [DBName]);
    const stream = fs.createReadStream(pathToDBStructure).pipe(child.stdin);
    //when db structure initializing finished
    stream.on("close", async () => {
      //wait for data parsing
      filesData = await filesData;
      //create insert queries
      for (const { file, data } of filesData) {
        const table = file.replace(/\.[^\.]+$/, "");
        const keys = Object.keys(data[0]);
        const args = new Array(data.length * keys.length);
        const params = new Array(data.length);
        let i = 0;
        data.map((dataRow) => {
          params[i] = new Array(keys.length);
          let j = 0;
          for (const key of keys) {
            args[i * keys.length + j] = dataRow[key];
            params[i][j] = "?";
            j++;
          }
          params[i] = `(${params[i].join(", ")})`;
          i++;
        });
        //because sqlite has maximum 999 arguments and files have much more
        //it is needed to slice queries on smaller
        const max = 999;
        const statementsCnt = Math.floor(max / keys.length);
        const argsCnt = statementsCnt * keys.length;
        i = 0;
        while (true) {
          const paramsSlice = params.slice(
            i * statementsCnt,
            (i + 1) * statementsCnt
          );
          const argsSlice = args.slice(i * argsCnt, (i + 1) * argsCnt);
          if (!paramsSlice.length) {
            break;
          }
          const sql = `INSERT INTO ${table} (${keys.join(
            ", "
          )}) VALUES ${paramsSlice.join(", ")};`;
          i++;
          //and run query on subset of fields
          try {
            await db.prepare(sql).run(argsSlice);
          } catch (error) {
            db.release();
            throw error;
          }
        }
      }
      db.release();
    });
  } else {
    db.release();
  }
})();
