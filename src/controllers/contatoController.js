exports.index = (req, res) => {
    return res.render('contato');
};

exports.register = (req, res) => {
    res.send('Formulário enviado com sucesso.');
};