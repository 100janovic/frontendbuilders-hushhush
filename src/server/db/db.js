
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node';
import path from "path";

const dirname = process.cwd();
const src = path.join(dirname, 'src', 'server', 'db', 'db.json');
const db = new LowSync(new JSONFileSync(src), {
    users: [],
    secrets: []
});
db.read();

export default db;