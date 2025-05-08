import app from "./app";
import { HOST, NODE_ENV, PORT } from "./configs/config";

app.listen(PORT, () => {
  if (NODE_ENV === "development") {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  }
});
