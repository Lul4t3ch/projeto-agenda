 const mongoose = require('mongoose');

 const ContatoSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String
    }
 );

const ContatoModel = mongoose.model('Contato', ContatoSchema);


function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
};

Contato.prototype.register = function() {
    this.valida();
}



module.exports = Contato;