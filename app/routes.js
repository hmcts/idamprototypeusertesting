const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


router.post( '/signin', function (req, res)
{
    req.session.data['errorcounter'] = '0';
    req.session.data['code'] = '';
    res.redirect('/verification?errorcode=false&');
})


router.post( '/signincreateaccount', function (req, res)
{
    var error = false;
    var emailerror = false;
    var passworderror = false;

    // Check email contains correct symbols
    if( req.session.data['email'].includes("@") == false )
    {
        emailerror = true;
    }

    // Check password is not empty/is correct
    if( req.session.data['password'] == '' )
    {
        passworderror = true;
    }

    if(emailerror && passworderror)
    {
        res.redirect('/signincreateaccount?erroremail=true&errorpassword=true&');
    }
    else if(emailerror)
    {
        res.redirect('/signincreateaccount?erroremail=true&');
    }
    else if(passworderror)
    {
        res.redirect('/signincreateaccount?errorpassword=true&');
    }
    else
    {
        res.redirect('/verification?errorcode=false&');
    }


})


router.post( '/verification', function (req, res)
{
    if(req.session.data['code'] == '12345678' )
    {
        req.session.data['errorcounter'] == '0';
        res.redirect('/failedverification?errorcode=false&');
    }
    else
    {
        if(req.session.data['errorcounter'] != '1'  &&  req.session.data['errorcounter'] != '2'  &&  req.session.data['errorcounter'] != '3')
        {
            req.session.data['errorcounter'] = '1'
            res.redirect('/verification?errorcode=true&');
        }
        else if(req.session.data['errorcounter'] == '1' )
        {
            req.session.data['errorcounter'] = '2'
            res.redirect('/verification?errorcode=true&');
        }
        else if(req.session.data['errorcounter'] == '2' )
        {
            res.redirect('/failedverification?errorcode=false&');
        }
    }
})


router.post( '/failedverification', function (req, res)
{
    res.redirect('/signin');
})