const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');     

const JWT_SECRET = "SECRETkeyForSigningJWTtokenbyRAJAT";

//ROUTE 1: Create a user using POST "/api/auth/createuser". No Login Required.

router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success  = false;
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()

    //If there are errors then return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() })
    }

    //Check Whether the user  with this email exists already .
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exits." })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.name
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({error : "Please Enter a Unique Value.",Message : err.message});
        // })

        // res.send({ errors: result.array() });
        success = true;
        res.json({success, authtoken })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})




//ROUTE 1: Authenticate a User using : POST  "/api/auth/login"


router.post('/login', [
    body('email', 'Enter A Valid Email.').isEmail(),
    body('password', 'Password Can not be Blank').exists(),
], async (req, res) => {

    let success  =false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success , error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success  =true
        res.json({ success,authtoken });

    } catch (error) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});



// ROUTE 3: get Loggedin User Details using :POST "/api/auth/getuser". Login required.


router.post('/getuser',fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

});
module.exports = router 