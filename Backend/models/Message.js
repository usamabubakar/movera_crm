const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema(
    {
        chatid: String,
        senderid: String,
        senderType: { type: String, enum: ['admin', 'agent'] },
        text: [{ senderid: String, text: String, createdAt: { type: Date, default: Date.now } }],
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', message);

module.exports = Message;
