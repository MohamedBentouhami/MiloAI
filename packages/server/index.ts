import express from "express";
import { chatController } from "./controllers/chat.controller";



const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


app.post('/api/chat', chatController.sendMessage);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

