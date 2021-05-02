import app from "./app";

import connection from "./infra/config/database";

const PORT = 3000;

connection.then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
