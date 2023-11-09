const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/contato',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

const UsuarioSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    phone : {type : Number, required : true},
    message : {type : String, required : true}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/contatousuario", async(req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message

    if(name == null || email == null || phone == null || message == null){
        return res.status(400).json({error : "Preencha todos os campos"})
    }
    
    const usuario = new Usuario({
        name : name,
        email : email,
        phone : phone,
        message : message
    })

    try{
        const newUsuario = await usuario.save()
        res.json({error : null, msg : "Cadastro OK", usuarioId : newUsuario._id});
    }catch(error){
        res.status(400).json({error});
    }
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.get("/contatousuario", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.listen(port, ()=>{
    console.log(`O servidor está rodando na porta ${port}`);
});