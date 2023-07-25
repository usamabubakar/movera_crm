const agentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: false
    },
    starttime: {
      type: Date,
      required: true
    },
    endtime: {
      type: Date,
      required: true
    }
  });
  const Agent = mongoose.model('Agent', agentSchema);

  module.exports = Agent;