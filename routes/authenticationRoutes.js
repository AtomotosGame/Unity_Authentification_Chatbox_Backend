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
        
        var userAccount = await Account.findOne({eamil : RUusername});
        
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
    
}

