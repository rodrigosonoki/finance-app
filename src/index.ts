import express from "express";
import routes from "./routes";

// Create an Express application
const app = express();

// Use the example route
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
