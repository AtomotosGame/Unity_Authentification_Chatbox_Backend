const mongoose = require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    playerName: String,
    playerLevel: Number,
    level: Number,
    Gold: Number,
    Elixir: Number,
    BlackElixir: Number,
    Gem: Number,
    maxGold: Number,
    maxElixir: Number,
    maxBlackElixir: Number,
    ownedBuildings: [],
    lastAuthentication: Date,
});

mongoose.model('accounts', accountSchema);
