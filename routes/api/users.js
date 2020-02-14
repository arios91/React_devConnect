const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/Users');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be six or more characters').isLength({min: 6})
    ],
    async (req, res) => {
        //error validation before continuing
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try{
            //check if user exists
            let user = await User.findOne({email});
            if(user){
                //return an error matching the format of previous errors
                return res.status(400).json({errors: [{msg: 'User already exists'}]})
            }

            const avatar = gravatar.url(email, {s:'200', rating: 'pg', default: 'mm'});
            
            user = new User({
                name,
                email,
                avatar,
                password 
            })

            //anything that returns a promise must have 'await'
            //this replaces the .then() notation
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if(err){
                        throw err;
                    }
                    res.json({token});
                });

        }catch(err){
            console.error('err.message');
            return res.status(500).send('Server Error');
        }
    }
)

module.exports = router;