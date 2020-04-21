'use strict';

function handleError (err, request, response) {
    let viewModel = {
        error: err,
    };
    response.status(500).render('/pages/error-view', viewModel);
}

module.exports = handleError;