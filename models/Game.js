const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const gameSchema = new Schema({
  gameID: {
    type: String,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  MainRegCards: [{
    type: String,
    require: false
  }],
  MainCardKill: [{
    type: String,
    require: false
  }],
  promptCards: [{
    type: String,
    require: false
  }],
  promptCardKill: [{
    type: String,
    require: false
  }]
})