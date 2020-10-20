const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


router.get( '/signinstart', function (req, res)
{
    res.redirect('/signincreateaccount?errorsignin=false&erroremail=false&errorpassword=false&createaccountshowing=false&email=&password=&');
})


router.get( '/signincreateaccountstart', function (req, res)
{
    res.redirect('/signincreateaccount?errorsignin=false&erroremail=false&errorpassword=false&createaccountshowing=true&false&email=&password=&');
})


router.post( '/signincreateaccount', function (req, res)
{
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
        res.redirect('/signincreateaccount?errorsignin=true&erroremail=true&errorpassword=true&');
    }
    else if(emailerror)
    {
        res.redirect('/signincreateaccount?errorsignin=true&erroremail=true&errorpassword=false&');
    }
    else if(passworderror)
    {
        res.redirect('/signincreateaccount?errorsignin=true&erroremail=false&errorpassword=true&');
    }
    else
    {
        req.session.data['errorsignin'] = false;
        req.session.data['erroremail'] = false;
        req.session.data['errorpassword'] = false;
        req.session.data['errorcounter'] = '0';
        req.session.data['code'] = '';

        res.redirect('/verification?');
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