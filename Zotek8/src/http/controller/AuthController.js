const jwt = require("jsonwebtoken");
const db = require("../../models/index");
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const dotenv = require('dotenv');



dotenv.config();



const authController = {

    // registerUser: async (req, res) => {
    //     try {
    //         const salt = await bcrypt.genSalt(10);
    //         const hashed = await bcrypt.hash(req.body.password, salt);



    //         const newUser = await new User({
    //             username: req.body.username,
    //             email: req.body.email,
    //             password: hashed,
    //         });


    //         const user = await newUser.save();
    //         res.status(200).json(user);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    saveRefreshToken: async (user, refreshToken, ip) => {
        try {
            let query = `SELECT 1 FROM refresh_token WHERE user_id = '${user.id}' AND ip = '${ip}'`
            let [results] = await db.sequelize.query(query, {
                replacements: {},
                type: Sequelize.QueryTypes.SELECT,
            })
            if (results) {
                query = ` UPDATE refresh_token SET token = '${refreshToken}' , updatedAt = '${moment().format(process.env.DATE_TIME_FORMAT)}' WHERE user_id = '${user.id}' AND ip = '${ip}'`;
                await db.sequelize.query(query)
            } else {
                query = `INSERT INTO refresh_token (user_id, token, ip, createdAt, updatedAt ) VALUES ('${user.id}' , '${refreshToken}', '${ip}', '${moment().format(process.env.DATE_TIME_FORMAT)}', '${moment().format(process.env.DATE_TIME_FORMAT)}')`;
                await db.sequelize.query(query)
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    loadRefreshToken: async () => {
        try {
            const [results, metadata] = await db.sequelize.query("SELECT token FROM refresh_token", {
                type: Sequelize.QueryTypes.SELECT,
            });
            return results;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    generateAccessToken: async (user) => {
        return await jwt.sign(
            {
                id: user.id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "12h" }
        );
    },

    generateRefreshToken: async (user) => {
        return await jwt.sign(
            {
                id: user.id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "365d" }
        );
    },

    findOneUser: async (email_username) => {
        const user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { username: email_username },
                    { email: email_username },
                ]
            },
            include: ['employee'],
            raw: true,
            nest: true,
        })
        return user;
    },

    /**
     * Kiểm tra xem người dùng đã đăng nhập chưa, kiểm tra theo cấp độ phân quyền.
     * 
     * @param {int} level cấp độ phân quyền
     * @param {callback} next : Hàm xử lý sau khi xác nhận người dùng chưa đạt yêu cầu đăng nhập.
     * 
     * @returns {Response|callback} trả về callback nếu chưa đăng nhập, hoặc quyền không đạt.
     */

    checkLogin: (req, res, level, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const accessToken = authorization.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRET_KEY, async (err, user) => {
                if (err) {
                    return next();
                }
                req.user = await db.User.findOne({
                    where: { id: user.id },

                    attributes: { exclude: ['password'] },
                    raw: true,
                    nest: true,
                });

                return next();
            });
        } else {
            return next();
        }
    },


    /**
     * 
     * @param {Request} req:request
     * @param {Response} res: Response
     * @param {Int} level: cấp độ phân quyền người dùng 
     * 
     * @returns {Response} status 404, 500, 200
     */
    loginUser: async (req, res, level) => {
        const ipRequest = req.connection.remoteAddress;
        try {
            const user = await authController.findOneUser(req.body.email_username);
            if (!user) {
                return res.status(404).json({
                    message: "Thông tin đăng nhập không chính xác.",
                    login: false
                });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(404).json({
                    message: "Thông tin đăng nhập không chính xác.",
                    login: false
                });
            }
            if (user && validPassword) {

                const accessToken = await authController.generateAccessToken(user);

                const refreshToken = await authController.generateRefreshToken(user);

                await authController.saveRefreshToken(user, refreshToken, ipRequest);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });

                const { password, ...others } = user;
                console.log(user);
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    /**
     * Hàm tạo lại assetToken từ refreshToken.
     * @param {Request} req 
     * @param {Response} res 
     * 
     * @returns {Response} res: thông báo kết quả thất bại|tạo lại thành công tokens
     */

    requestRefreshToken: async (req, res) => {

        const refreshToken = req.cookies.refreshToken;
        const refreshTokens = await authController.loadRefreshToken();

        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        await jwt.verify(refreshToken, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                console.log(err);
            }

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            const newAccessToken = await authController.generateAccessToken(user);
            const newRefreshToken = await authController.generateRefreshToken(user);
            authController.saveRefreshToken(user, newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    },


    logOut: async (req, res) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    },

};

module.exports = authController;
