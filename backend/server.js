import express from "express";
import routes from "./src/routes/usersRoutes.js";

const app = express();
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

