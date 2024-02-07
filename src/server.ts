import app from "./index";
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { db } from "./db";
const port = 3000;





const startServer = async () => {
    try {
      // Perform database migration
      await migrate(db, {
        migrationsFolder: "./migration"
      });
  
      // Start the Express app
      app.listen(port, () => {
        console.log(`App is listening at port http://localhost:${port}`);
      });
    } catch (error) {
      console.error("Error during migration:", error);
    }
  };
  
  // Call the async function to start the server
  startServer();



