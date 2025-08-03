import { app } from "./app/app";
import { config } from "dotenv";
import { validateEnv } from "./env/validate-env";

config();

validateEnv();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on ${process.env.SERVER_PORT} port`);
});