import dayjs from "dayjs";
import participants from "../../data/participants.js";
import messages from "../../data/messages.js";
import Joi from "joi";

const addMensseger = (req, res) => {

    const fromUser = req.get('user');
    const message = req.body;
    const userExist = participants.find((participant) => participant.name === fromUser);
    message.text = message.text.trim();
    
    const messageSchema = Joi.object({
        to: Joi.string()
            .required(),
        text: Joi.string()
            .required(),
        type: Joi.string()
            .valid("message", "private_message") 
            .required()
    });  

    const schemaValidation = messageSchema.validate(message);
    
    if(!userExist || schemaValidation.error) {
        res.sendStatus(400);
        return;
    }

    message.from = fromUser;
    message.time = dayjs().format('HH:mm:ss');
    messages.push(message);
    console.log(messages)
    res.sendStatus(200);
}

export default addMensseger;