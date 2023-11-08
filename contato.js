const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

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
    nome : {type : String, required : true},
    email : {type : String, required : true},
    telefone : {type : Number, required : true},
    mensagem : {type : String, required : true}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/contatousuario", async(req, res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const mensagem = req.body.mensagem

    if(nome == null || email == null || telefone == null || mensagem == null){
        return res.status(400).json({error : "Preencha todos os campos"})
    }
    
    const usuario = new Usuario({
        nome : nome,
        email : email,
        telefone : telefone,
        mensagem : mensagem
    })

    try{
        const newUsuario = await usuario.save()
        res.json({error : null, msg : "Cadastro OK", usuarioId : newUsuario._id});
    }catch(error){
        res.status(400).json({error});
    }
});

app.get("/contatousuario", async(req, res)=>{
    res.sendFile(__dirname +"/contatousuario.html");
})

app.listen(port, ()=>{
    console.log(`O servidor está rodando na porta ${port}`);
});