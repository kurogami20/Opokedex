import "dotenv/config";
import { Sequelize } from "sequelize";
// import pg from "pg";

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  },
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
export default sequelize;
