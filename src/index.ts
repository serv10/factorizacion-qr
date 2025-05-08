import app from "./app.ts";
import { HOST, NODE_ENV, PORT } from "./configs/config.ts";

app.listen(PORT, () => {
  if (NODE_ENV === "development") {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  }
});
