require("dotenv").config();

const app = require("./app")

const { PORT } = process.env || 3100;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`)
});