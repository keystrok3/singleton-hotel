const { user_table } = require("../models/User");

const bcrypt = require('bcrypt');


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


const login = async (req, res, next) => {


}

module.exports = { register };
