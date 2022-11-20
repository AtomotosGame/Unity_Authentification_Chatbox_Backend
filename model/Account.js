const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    planername: String,
    playerlevel: Number,
    level: Number,
    gold: Number,
    elixir: Number,
    blackelixir: Number,
    gem: Number,
    maxgold: Number,
    maxlixir: Number,
    ownedbuildings: [],
    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);
