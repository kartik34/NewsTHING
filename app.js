var express     = require("express"),
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose"), 
    app         = express(); 
    
//=================================================================
//             CONNECTING LIBRARIES

mongoose.connect("mongodb://localhost/test6"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

//=================================================================
//                MONGODB CONFIG
 

var citySchema = new mongoose.Schema({
    rating: Array(30), 
    name: String, 
    term: String
    
   
})

var City = mongoose.model("City", citSchema); 

//===================================================================
//                ROUTES

app.get("/", function(req, res){
    res.render("home")
    
});

app.get("/showpage/:id", function(req,res){
    Mole.findById(req.params.id, function(err, foundMole){
        if(err){
            res.redirect("index")
        }else{
            console.log(foundMole)
            res.render("show", {mole: foundMole})
        }
    })
})
app.put("/showpage/:id", function(req,res){
    
    
    
    
    Mole.findByIdAndUpdate(req.params.id, req.body.message, function(err, updatedMole){
        if(err){
            res.redirect("index")
        }else{
            console.log(updatedMole)
            var id = updatedMole.basicId.toString()
            var string = "message"
        
            
          admin.database().ref("/").update({[updatedMole.basicId] : req.body.message});


          
          res.redirect(updatedMole._id)

         
            
        }
    })
})

app.post("/showpage", function(req,res){
    //edit mole db to include new message 
    
})











app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening"); 
})