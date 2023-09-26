const db = require('../../../models/index')
const bcrypt = require('bcrypt')
const authController = require('../AuthController')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const adminController = {
    adminLogin: async (req, res) => {
        await authController.loginUser(req, res, 1);
    },
    getInfoAdmin: async (req, res) => {
        let userId = req.user.id;
        return await res.json(req.user);
    }
}


module.exports = adminController