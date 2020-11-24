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


//  SIGN IN PAGE
router.post( '/submitsignin', function (req, res)
{
    console.log("EMAIL UP FRONT 1st:" + req.session.data['email']);

    var emailerror = false;
    var passworderror = false;

    console.log("EMAIL UP FRONT:" + req.session.data['email']);

    var tempemail =  req.session.data['email'];
    var temppassword =  req.session.data['password'];


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

    // reassigned the data that was entered
    req.session.data['email'] = tempemail;
    req.session.data['password'] = temppassword;

    console.log("EMAIL " + req.session.data['email']);


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
        // As there are no errors then reset data for the verification page
        req.session.data['errorsignin'] = false;
        req.session.data['erroremail'] = false;
        req.session.data['errorpassword'] = false;
        req.session.data['errorcounter'] = '0';
        req.session.data['code'] = '';
        req.session.data['errorcode'] = 'false';

        res.redirect('/verification?');
    }

})


//  VERIFICATION PAGE
router.post( '/submitverificationcode', function (req, res)
{
    if(req.session.data['code'] == '94674094' )
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


// For the timeout of verification code the next page must be to start over with sign in
router.post( '/failedverification', function (req, res)
{
    res.redirect('/signin');
})



// GO TO CREATE ACCOUNT
router.get( '/gotocreateaccount', function (req, res)
{
    res.redirect('/createaccountsignin?erroroncreateaccount=false&errorfirstname=false&errorlastname=false&erroremailaddress=false&firstname=&lastname=&emailaddress=&');
})

// Create account - ALL errors
router.get( '/gotocreateaccountallerrors', function (req, res)
{
    res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=true&erroremailaddress=true&');
})


// Create account - First name error
router.get( '/gotocreateaccountfirstnameerror', function (req, res)
{
    res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=false&erroremailaddress=false&lastname=test&emailaddress=test@test.co.uk&');
})


// Create account - Last name error
router.get( '/gotocreateaccountlastnameerror', function (req, res)
{
    res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=false&errorlastname=true&erroremailaddress=false&firstname=test&emailaddress=test@test.co.uk&');
})


// Create account - Email address error
router.get( '/gotocreateaccountemailaddresserror', function (req, res)
{
    res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=false&errorlastname=false&erroremailaddress=true&firstname=test&lastname=test&emailaddress=test.co.uk&');
})



// CREATE ACOUNT SUMIT PAGE
router.post( '/createaccount', function (req, res)
{
    var firstnameerror = false;
    var lastnameerror = false;
    var emailerror = false;

    console.log("DATA:" + req.session.data);
    console.log("\nFIRST NAME:" + req.session.data['firstname']);
    console.log("LAST NAME:" + req.session.data['lastname']);
    console.log("EMAIL:" + req.session.data['emailaddress'] + "\n\n");

    var tempemail =  req.session.data['emailaddress'];

    // Check first name is not empty
    if( req.session.data['firstname'] == '' )
    {
        firstnameerror = true;
    }

    // Check last name is not empty
    if( req.session.data['lastname'] == '' )
    {
        lastnameerror = true;
    }

    // Check email contains correct symbols
    if( tempemail.includes("@") == false )
    {
        emailerror = true;
    }


    if(firstnameerror && lastnameerror && emailerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=true&erroremailaddress=true&');
    }
    else if(firstnameerror && lastnameerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=true&erroremailaddress=false&');
    }
    else if(lastnameerror && emailerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=false&errorlastname=true&erroremailaddress=true&');
    }
    else if(firstnameerror && emailerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=false&erroremailaddress=true&');
    }
    else if(firstnameerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=true&errorlastname=false&erroremailaddress=false&');
    }
    else if(lastnameerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=false&errorlastname=true&erroremailaddress=false&');
    }
    else if(emailerror)
    {
        res.redirect('/createaccountsignin?erroroncreateaccount=true&errorfirstname=false&errorlastname=false&erroremailaddress=true&');
    }
    else
    {
        // As there are no errors then reset data for the verification page
        req.session.data['erroroncreateaccount'] = false;
        req.session.data['errorfirstname'] = false;
        req.session.data['errorlastname'] = false;
        req.session.data['erroremailaddress'] = false;

        res.redirect('/checkemailcreateaccount');
    }

})




// submit new password
router.post( '/createpasswordchecker', function (req, res)
{
    var passworderror = false;
    var differentpssworderror = false;

    var passwordone =  req.session.data['password1'];
    var passwordtwo =  req.session.data['password2'];


    // Check first name is not empty
    if( passwordone == '' )
    {
        passworderror = true;
    }
    console.log("HW passswod error :" + passworderror + "\n\n");
    console.log("HW Password is  :" + passwordone + "\n\n");
    console.log("HW LONG :" + passwordone.length + "\n\n");

    if( passwordone.length < 8  )
    {
        passworderror = true;
    }

    console.log("HW passswod error :" + passworderror + "\n\n");
    // Check email contains correct symbols
    //if( tempemail.includes("@") == false )
    //{
     //   emailerror = true;
    // }


    // Check last name is not empty
    if( req.session.data['password1'] != req.session.data['password2'] )
    {
        differentpssworderror = true;
    }


    if(passworderror)
    {
        res.redirect('/createpassword?errorpasswordfailscriteria=true&errorcofirmpasswordemptyordifferent=false&');
    }

    if(differentpssworderror)
    {
        res.redirect('/createpassword?errorpasswordfailscriteria=false&errorcofirmpasswordemptyordifferent=true&');
    }

    if(passworderror || differentpssworderror)
    {

    }
    else
    {
        // As there are no errors then reset data for the verification page
        req.session.data['errorpasswordfailscriteria'] = false;
        req.session.data['errorcofirmpasswordemptyordifferent'] = false;

        req.session.data['password1'] = '';
        req.session.data['password2'] = '';

        res.redirect('/accountcratedconfirmation');
    }

})