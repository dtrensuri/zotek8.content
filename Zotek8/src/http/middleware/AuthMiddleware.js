// const authController = require('../controller/AuthController');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const accessToken = authorization.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRET_KEY, async (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: "Đăng nhập lại để tiếp tục.",
                        error: 'Invalid authorization.',
                    });
                }
                req.user = await db.User.findOne({
                    where: { id: user.id },
                    attributes: { exclude: ['password'] },
                    raw: true,
                    nest: true,
                });

                req.employee = await db.Employee.findOne({
                    where: { id: req.user.employee_id },
                });
                next();
            });
        } else {
            res.status(401).json({
                message: "Đăng nhập lại để tiếp tục.",
                error: '.',

            });
        }
    },

    // verifyRole: (req, res, next, level) => {
    //     authMiddleware.verifyToken(req, res, () => {
    //         // console.log(req.user.role);
    //         if (req.user.role.level <= level) {
    //             return next();
    //         }
    //         res.status(401).json({
    //             message: "Đăng nhập lại để tiếp tục.",
    //             error: 'Quyền không đủ.',
    //         });
    //     });
    // },

    // verifyRoleAdmin: (req, res, next) => authMiddleware.verifyRole(req, res, next, 1),

    // verifyRoleLevel2: (req, res, next) => authMiddleware.verifyRole(req, res, next, 2),

    // verifyRoleLevel3: (req, res, next) => authMiddleware.verifyRole(req, res, next, 3),
}

module.exports = authMiddleware

