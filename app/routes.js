const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


router.post( '/signin', function (req, res)
{
    res.redirect('/verification?errorcode=false&');

})

router.post( '/verification', function (req, res)
{

    res.redirect('/failedverification');
})

router.post( '/failedverification', function (req, res)
{
    res.redirect('/signin');
})