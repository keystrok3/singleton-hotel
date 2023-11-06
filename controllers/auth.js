const { user_table } = require("../models/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require("../utils/email");


const register = async (req, res, next) => {
    
    const { email, firstName, lastName, password } = req.body;

    try {

        const salt = await bcrypt.genSalt(10);
        let hashedpassword = await bcrypt.hash(password, salt);
        
        const user = await user_table.create({ 
            firstName: firstName, 
            lastName: lastName,
            email: email,
            password: hashedpassword
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ success: false, data: error.message })
    }
    
};


/**
 * Login: 
 * 1. Get credentials from client
 * 2. Verify credentials through a db query
 * 3. If valid generate a jwt token with an 
 *    expiry date and store it in the user_table
 * 4. Return a response with the token
*/
const login = async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ success: false, msg: "Please provide email and password" });
    }

    try {
        console.log(process.env.JWT_EXPIRES);
        const user = await user_table.findOne({ where: { email: email }});

        if(!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }

        const signedToken = jwt.sign(
            { id: user.id, }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.status(201).json({ success: true, signedToken });

    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};



/**
 * Forgot Password:
 * 1. Get user's email 
 * 2. Check if available in database
 * 3. If available set the user's resetPasswordToken and expiry 
 *    attribute in database 
 * 4. Send the a url to reset the password to the provided email address.
*/
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await user_table.findOne({ where: { "email": email }});

        if(!user) {
            return res.status(404).json({ success: false, msg: "Email could not be sent" });
        }

        //Generate token and save it to db
        const token = crypto.randomBytes(20).toString("hex");
        const resetToken = crypto.createHash('sha256').update(token).digest("hex");
        user.update({ resetPasswordToken: resetToken });

        // Send token to email address
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off> ${resetUrl} <a/>
        `;
        
        try {
            await sendEmail({
                to: user.email, 
                subject: "Password reset request",
                text: message
            })
        } catch (error) {
            
        }


    } catch (error) {
        
    }
};

module.exports = { register, login };
