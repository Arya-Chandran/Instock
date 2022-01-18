const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

const warehouseRoute = require("./routes/warehouseRoute");
const inventoryRoute = require("./routes/inventoryRoute");

app.use(cors());
app.use(express.json());

app.use("/warehouse", warehouseRoute);
app.use("/inventory", inventoryRoute);

app.get("/*", (req, res) => {
  res.send("Page not found");
});

app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});
