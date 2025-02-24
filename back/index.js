import app from "./src/app.js";
import "dotenv/config";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
