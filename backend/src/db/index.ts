import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// export const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
const dbConfig = {
  user: "dhvqnslmwxgzgpfk",
  password: "SPw%G%Bh1Q#34BHk3CztESlzcTZ5ZFx-",
  host: "102.134.147.233",
  port: 32761,
  database: "roxedxqhiwclbatqedwffigt",
};

export const db = new Pool(dbConfig);
