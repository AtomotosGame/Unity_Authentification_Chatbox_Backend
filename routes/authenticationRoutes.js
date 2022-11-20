const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    //Routes
    app.get('/', (req, res) => {
        res.send("login");
    });

    app.post('/account/login', async(req, res) => {
    
    const {RUusername, RPassword} = req.body;
    
    if(RUusername == null || RPassword == null)
    {
        res.send("Invalid Credentials!");
        return;
    }
    
    var userAccount = await Account.findOne({email : RUusername});
    
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
    
    res.send("Invalid Credentials");
    
    });


    //Create Account
    app.post('/account/Create', async(req, res) => {
    
        const {RUusername, RPassword} = req.body;
        
        if(RUusername == null || RPassword == null)
        {
            res.send("Invalid Credentials!");
            return;
        }
        
        var userAccount = await Account.findOne({email : RUusername});
        
        if(userAccount == null)
        {
            console.log("create New Account");
        
            var NewAccount = new Account({
                email : RUusername,
                password : RPassword,
                planername : "",
                playerlevel : 1,
                level : 1,
                gold : 1000,
                elixir : 1000,
                blackelixir : 1000,
                gem : 500,
                maxgold : 1000000,
                maxlixir : 10000000,
                ownedbuildings: [{id: 1, pos: [{x: 21, y:21}]}],
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
    
        const {id} = req.query;
        
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
    
    //Create Account
    app.post('/account/update', async(req, res) => {
    
        const { 
            id,
            planername,
            playerlevel,
            level,
            gold,
            elixir,
            blackelixir,
            gem,
            maxgold,
            maxlixir,
            ownedbuildings
        } = req.body;
        
        if(id == null)
        {
            res.send("Invalid Credentials!");
            return;
        }

        if (planername !== null)
            await Account.findOneAndUpdate({_id : id},{planername: planername});

        if (playerlevel !== null)
            await Account.findOneAndUpdate({_id : id},{playerlevel: playerlevel});
        
        if (level !== null)
            await Account.findOneAndUpdate({_id : id},{level: level});

        if (gold !== null)
            await Account.findOneAndUpdate({_id : id},{gold: gold});
        
        if (elixir !== null)
            await Account.findOneAndUpdate({_id : id},{elixir: elixir});

        if (blackelixir !== null)
            await Account.findOneAndUpdate({_id : id},{blackelixir: blackelixir});
        
        if (gem !== null)
            await Account.findOneAndUpdate({_id : id},{gem: gem});

        if (maxgold !== null)
            await Account.findOneAndUpdate({_id : id},{maxgold: maxgold});
        
        if (maxlixir !== null)
            await Account.findOneAndUpdate({_id : id},{maxlixir: maxlixir});

        if (ownedbuildings !== null)
            await Account.findOneAndUpdate({_id : id},{ownedbuildings: ownedbuildings});
        
        res.send("Update successufully");
        
    });
}

