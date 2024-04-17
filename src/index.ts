import express from 'express';
import bodyParser from 'body-parser';
import {MagicLinkGenerationService} from "./magicLink/Generate";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.get('/', async (req, res) => {
    const magicLink = new MagicLinkGenerationService()
    const finalLink = await magicLink.generateMagicLink('abc@anymail.com', '/')
    res.send(`Hello World! ${finalLink}`);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});