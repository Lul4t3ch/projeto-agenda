const Contato = require('../models/ContatoModel');



exports.index = async (request, response) => {
    const contatos = await Contato.searchForContacts();
    response.render('index', {  contatos });
};

