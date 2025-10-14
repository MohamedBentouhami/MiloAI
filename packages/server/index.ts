import express from "express";
import { apiRouter } from "./routers";



const app = express();
app.use(express.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

