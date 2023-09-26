const db = require('../../../models/index');

const getAllUsers = async (req, res) => {
    console.log(req.headers);
    return res.json({
        'body': {
            "user": await db.Account.findAll(),
            'message': 'Welcome',
        }
    })
}

module.exports = {
    getAllUsers
}