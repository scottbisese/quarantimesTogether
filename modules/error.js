'use strict';

function handleError (response, err, status ) {
    let viewModel = {
        error: err,
    };
    console.error(err);
    response.status(status).render('pages/error-view', viewModel);
}

module.exports = handleError;