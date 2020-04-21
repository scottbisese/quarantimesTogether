'use strict';

function handleError (err, req, res ) {
    let viewModel = {
        error: err,
    };
    console.error(err);
    res.status(500).render('pages/error-view', viewModel);
}

module.exports = handleError;