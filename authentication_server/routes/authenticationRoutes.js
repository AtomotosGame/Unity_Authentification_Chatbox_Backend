const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    //Routes test
    app.get('/', (req, res) => {
        res.send("server is working");
    });

    //Login
    app.post('/account/login', async(req, res) => {
    
    const {REmail, RPassword} = req.body; // get email & password
    
    // validation
    if(REmail == null || RPassword == null)
    {
        res.send("Invalid Credentials!");
        return;
    }
    
    //Detect duplicate accounts that same email.
    var userAccount = await Account.findOne({email : REmail});
    
    // there is no repetition account.
    if(userAccount != null)
    {
        if(RPassword == userAccount.password){
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();
    
            console.log("retrieving Account");
            res.send(userAccount);
            return;
        }
    }
    
    // there is repetition account
    res.send("Invalid Credentials");
    
    });


    //Create Account
    app.post('/account/Create', async(req, res) => {
    
        const {REmail, RPassword} = req.body;
        
        if(REmail == null || RPassword == null)
        {
            res.send("Invalid Credentials!");
            return;
        }
        
        var userAccount = await Account.findOne({email : REmail});
        
        if(userAccount == null)
        {
            console.log("create New Account");
        
            // init  info
            var NewAccount = new Account({
                email : REmail,
                password : RPassword,
                playerName : "",
                playerLevel : 1,
                level : 1,
                Gold : 1000,
                Elixir : 1000,
                NlackElixir : 1000,
                Gem : 500,
                maxGold : 1000000,
                maxElixir : 10000000,
                maxBlackElixir : 10000000,
                ownedBuildings: [{id: 1, pos: [{x: 21, y:21}]}],
                lastAuthentication : Date.now()
            })

            await NewAccount.save();
            res.send(NewAccount);
            return;
        }
        
        else{
            res.send("Username Is Already Taken");
        }
    });

    //Get Info
    app.get('/account/info', async(req, res) => {
    
        const {id} = req.query; //get parameter
        
        if(id == null)
        {
            res.send("Invalid Get Info!");
            return;
        }
        
        var userAccount = await Account.findOne({_id : id});
        
        if(userAccount == null)
        {
            res.send("There is no that user info");
            return;
        }
        
        else{
            res.send(userAccount);
            return;
        }
    });
    
    //Update Account
    app.post('/account/update', async(req, res) => {
    
        const { 
            id,
            playerName,
            playerLevel,
            level,
            Gold,
            Elixir,
            BlackElixir,
            Gem,
            maxGold,
            maxElixir,
            maxBlackElixir,
            ownedBuildings
        } = req.body;
        
        if(id == null)
        {
            res.send("Invalid Credentials!");
            return;
        }

        if (playerName !== null)
            await Account.findOneAndUpdate({_id : id},{playerName: playerName});

        if (playerLevel !== null)
            await Account.findOneAndUpdate({_id : id},{playerLevel: playerLevel});
        
        if (level !== null)
            await Account.findOneAndUpdate({_id : id},{level: level});

        if (Gold !== null)
            await Account.findOneAndUpdate({_id : id},{Gold: Gold});
        
        if (Elixir !== null)
            await Account.findOneAndUpdate({_id : id},{Elixir: Elixir});

        if (BlackElixir !== null)
            await Account.findOneAndUpdate({_id : id},{BlackElixir: BlackElixir});
        
        if (Gem !== null)
            await Account.findOneAndUpdate({_id : id},{Gem: Gem});

        if (maxGold !== null)
            await Account.findOneAndUpdate({_id : id},{maxGold: maxGold});
        
        if (maxElixir !== null)
            await Account.findOneAndUpdate({_id : id},{maxElixir: maxElixir});

        if (maxBlackElixir !== null)
            await Account.findOneAndUpdate({_id : id},{maxBlackElixir: maxBlackElixir});

        if (ownedBuildings !== null)
            await Account.findOneAndUpdate({_id : id},{ownedBuildings: ownedBuildings});
        
        res.send("Update successufully");

    });
}

