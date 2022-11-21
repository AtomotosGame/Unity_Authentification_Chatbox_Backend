const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    playerName: String,
    playerLevel: Number,
    level: Number,
    gold: Number,
    elixir: Number,
    blackElixir: Number,
    gem: Number,
    maxGold: Number,
    maxElixir: Number,
    ownedBuildings: [],
    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);
