import app from "./app";
import { setDataSourceConfig } from "./data-source";

(async () => {
  await setDataSourceConfig.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(3000, () => {
    console.log("Servidor executando");
  });
})();
