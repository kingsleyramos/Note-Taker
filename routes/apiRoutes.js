// Required Modules
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function(app){

    // GET Method to return all notes
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // POST Method to add notes
    app.post("/api/notes", function(req, res){

        // Reads db.json
        let rawdata = fs.readFileSync("./db/db.json");

        // converts the raw hex data to JSON Array
        let notesArray = JSON.parse(rawdata);

        // Set random id to entry
        req.body.id = Math.floor((Math.random() * 9999999999)).toString();
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        notesArray.push(req.body);

        // Converts JSON Array back to string
        notesString = JSON.stringify(notesArray);
        // Writes String back to db.json
        fs.writeFileSync("db/db.json", notesString, function(err){
            if (err) {
                return console.log(err);
            }
        });

        // returns array as JSON format.
        res.json(notesArray);
    });

    // DELETE Method to delete note with specified ID
    app.delete("/api/notes/:id", function(req, res){

        // Reads db.json
        let rawdata = fs.readFileSync("./db/db.json");

        // converts the raw hex data to JSON Array
        let notesArray = JSON.parse(rawdata);
        
        // Obtains id and converts to a string
        let id = req.params.id.toString();

        // Goes through notesArray searching for matching ID
        for (i=0; i < notesArray.length; i++){
           
            if (notesArray[i].id == id){

                // responds with deleted note
                res.send(notesArray[i]);

                // Removes the deleted note
                notesArray.splice(i,1);
                break;
            }
        }

        // Converts new JSON Array back to string
        notesString = JSON.stringify(notesArray);
        // Writes String back to db.json
        fs.writeFileSync("db/db.json", notesString, function(err){
            if (err) {
                return console.log(err);
            }
        });
    });
};