var express     = require("express"),
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose"), 
    app         = express(), 
    indico      = require('indico.io'),
    request     = require('request');


    
//=================================================================
//                      CONNECTING LIBRARIES
//=================================================================

app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));
app.set("view engine", "ejs"); 

//=================================================================
//                        MONGODB CONFIG
//=================================================================



// var Term = mongoose.model("Term", termSchema); 
var term1, term2        //defining term values
var term1week = {}     //30 day values
var term2week = {}
var term1avg, term2avg  //averages over 30 days


//===================================================================
//                     NEWS and INDICO API SETUP
//===================================================================

var newsAPI = '9d644f08ef5c4a16957e166803955b80'


indico.apiKey = "c43cb8fea029c7d120fd961f79ed4774";


var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

indico.sentiment("I write code")
  .then(response)
  .catch(logError);

//===================================================================
//                           INPUT SUGGESTIONS
//===================================================================

var termSuggestions = ["Donald Trump", "Beto O'rourke", "Amazon", "Apple", "Tesla", "Boston Celtics", "Toronto Raptors"];


//===================================================================
//                           ROUTES
//===================================================================
// term1 = "Bernie Sanders"
// term2 = "Justin Trudeau"

var arraytemp = []
var arraytemp2 = []
var finalarray1 = []
var finalarray2 = []
var term1locations = []
var term2locations = []
var data1 = []
var count = 0
var count1 = 0

app.get("/home", function(req, resource){
    
     for(var i = 16; i <= 22; i++){
        
        var url = "https://newsapi.org/v2/everything?q='" + term1 +"'"+ "&from=2018-11-"+i+"&to=2018-11-"+i+"&pageSize=100&sortBy=relevancy&language=en&apiKey="+ newsAPI
        console.log(url)
        request(url, function(error, response, body){
            arraytemp = []
            count1 = count1 + 1

            if(error){
                console.log(error)
            }else{
                var parsedData = JSON.parse(body);
                var log1 = 0 
                parsedData['articles'].forEach(function(title) {
                    if(log1 < 15){
                        
                  
                        arraytemp.push(title["publishedAt"].slice(8,10)+title["title"]);
                    }
                        
                    log1 = log1+1
                    
                });
            }
            finalarray1.push.apply(finalarray1, arraytemp)

            if(count1 == 7){

                
                finalarray1.forEach(function(title){
                    
                    term1locations.push(title.slice(0,2))
                    
                })
                finalarray2.forEach(function(title){
                    
                    term2locations.push(title.slice(0,2))
                    
                })
                console.log(term1locations)
                console.log(term2locations)
                var count3 = 0
                
                var response1 = function(res) {
                    console.log(count3)
                    count3 = count3 +1
                    console.log(count3)
                    if(count3 == 1){
                        data1 = res
                        console.log(data1)
                        
                    }
                    if(count3 == 2){
                        console.log(res)
                        console.log(term1)
                        resource.render("home", {suggest: termSuggestions, data1: data1, data2: res, size1: term1locations, size2: term2locations, term_1: term1, term_2:term2}); 
                    }

                }
                var logError1 = function(err) {
                    console.log(err); 
                    
                }
                indico.sentiment(finalarray1)
                   .then(count3 = 0)
                  .then(response1)
                  .catch(logError1);
                indico.sentiment(finalarray2)
                  .then(response1)
                  .catch(logError1);
                  
                  
                
                
            }
        });
    }
    for(var x = 16; x <= 23; x++){
        var url2 = "https://newsapi.org/v2/everything?q='" + term2 +"'"+ "&from=2018-11-"+x+"&to=2018-11-"+x+"&pageSize=100&sortBy=relevancy&language=en&apiKey="+ newsAPI
        console.log(url2)
        request(url2, function(error, response, body){
            count = count + 1
            arraytemp2 = []

            if(error){
                console.log(error)
            }else{
                var parsedData = JSON.parse(body);
                var log2 = 0
                parsedData['articles'].forEach(function(title) {
                    if(log2 < 15){

                            arraytemp2.push(title["publishedAt"].slice(8,10)+title["title"]);
                        
                        
                    }
                    log2 = log2 + 1
                    
                })
            }
            // console.log(arraytemp2)
            finalarray2.push.apply(finalarray2, arraytemp2)
            

        });
    }

    
 
});

app.get("/", function(req, res) {
    res.render("index", {suggest: termSuggestions});
});


app.post("/form", function(req, res) {
        //creating first term
        term1 = req.body.term1
        term2 = req.body.term2
        
        res.redirect("/home");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening"); 
});