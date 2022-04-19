//jshint esversion:6
var hello="welcome";
var hello1="please start";
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MyTodoListDB",{useNewUrlParser:true,useUnifiedTopology:true});
const Schema={
  name:String
}
var itemodel = mongoose.model('Items',Schema);
var Items = mongoose.model('Items');
const item1= new Items({
  name:"Welcome to This To-do-list",
});

const item2= new Items({
  name:"please start from here",
});
const array=[item1,item2];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {


  itemodel.find({},function(err,input){
    if (itemodel.length===0){
      itemodel.insertMany(array,function(err){
        if(err){Console.log(err);}
        else{
          console.log("success");
        }
        res.redirect("/");
      })
      
    }
    else{
      res.render("list", {listTitle: "Today" , newListItems:input });

    }

  })


  

});

app.post("/", function(req, res){

  var itemget = req.body.newItem;
  const insert1= new Items({
    name:itemget,
  })
  insert1.save();
  res.redirect("/");


});
app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  Items.findByIdAndRemove(checkedItemId, function(err){
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
