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

