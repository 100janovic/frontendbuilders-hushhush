
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node';
import path from "path";

export const {
    REACT_APP_ABC = "ABC",
    REACT_APP_XYZ = "XYZ",
  } = process.env;

const dirname = process.cwd();
const src = path.join(dirname, 'src', 'server', 'db', 'db.json');
const db = new LowSync(new JSONFileSync(src), {
    users: [],
    secrets: []
});
db.read();

export default db;