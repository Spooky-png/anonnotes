var express = require('express');
    app = express();
    mongoose = require('mongoose');
    var moment = require('moment');

    app.use(express.static( __dirname + '/public/dist/public' ));


const noteSchema = new mongoose.Schema({
    message: {type:String, minlength: 3, default: ""},
    created_at: String,
    }, {timestamps: true});
   const Note = mongoose.model('Note', noteSchema);

mongoose.connect('mongodb://localhost/note_db', { useNewUrlParser: true })

app.use(express.json());
app.get('/notes',(req, res) =>{
    Note.find()
        .then(notes => res.json(notes.reverse()))
        .catch(err => res.json(err));
}),
app.post('/notes',(req, res) =>{
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.json(err));
}),
app.post('/new', (req,res) =>{
    const note = new Note();
    note.message = req.body.message;
    note.created_at = moment().format("MMMM Do YYYY, h:mm:ss a")
    note.save()
        .then(notes => res.json(notes))
        .catch(err => res.json(err));
}),
app.get('notes/:id', (req,res) =>{
    Note.findOne({_id: req.params.id})
        .then(notes => res.json(notes))
        .catch(err => res.json(err));
});
app.delete('/remove/:id', (req, res) =>{
    const note = Note.findOne({_id: req.params.id})
        note.remove({_id: req.params.id})
        .then(notes => res.json(notes))
        .catch(err => res.json(err));
}),
app.listen(8000, function () {
    console.log("server running on port 8000");
});