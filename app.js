var express     = require("express"),
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose"), 
    app         = express(), 
    Twitter     = require('twitter'),
    indico      = require('indico.io');

    
//=================================================================
//                      CONNECTING LIBRARIES
//=================================================================

mongoose.connect("mongodb://localhost/test6"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

//=================================================================
//                        MONGODB CONFIG
//=================================================================


var citySchema = new mongoose.Schema({
    rating: Array(30), 
    name: String, 
    term: String
    
   
})

var City = mongoose.model("City", citySchema); 


//===================================================================
//                       TWITTER and INDICO API SETUP
//===================================================================

var client = new Twitter({
  consumer_key: 'Q6NIPLpK4oAgQBpB9ZcrF2gpo',
  consumer_secret: 'TOLJ4E0zd5797xTUnQwiei1y5H6aFVvbw08c8vxkrfDWwiVDHz',
  access_token_key: '1129780500-eAPePh6Iu0eqdYYB2vjF3oVcR672pXdnENpSjOG',
  access_token_secret: '5U9FouLuC5DiKC7XN49Gh1aM4Y31KBnnDn7SmiRKFbj37'
});

indico.apiKey = "c43cb8fea029c7d120fd961f79ed4774";


//===================================================================
//                           ROUTES
//===================================================================

app.get("/", function(req, res){
    res.render("home")
});

app.post("/add_city", function(req, res) {
    res.redirect("/")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening"); 
})