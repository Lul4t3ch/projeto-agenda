exports.middlewareGlobal = (request, response, next) => {
    response.locals.errors = request.flash('errors');
    response.locals.success = request.flash('success');
    response.locals.user = request.session.user;
    next();
};

exports.checkCsrf = (error, request, response, next) => {
    if(error) {
        response.render('404');
    }

    next();
};

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa estar logado para ter acesso a esta página');
        req.session.save(()=> res.redirect('/'));  
        return;
    }

    next();
};