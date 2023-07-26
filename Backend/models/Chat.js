

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
      members: Array,
      messages: {
        adminText: [
          {
            senderType: {
              type: String,
              enum: ['admin'],
            },
            text: String,
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        agentText: [
          {
            senderType: {
              type: String,
              enum: ['agent'],
            },
            text: String,
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
