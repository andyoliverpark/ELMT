import express from "express";
import cors from "cors";
import records from "./routes/record.js";

// DECLARING Constant Variables 
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// STARTS the Express Server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
}); 