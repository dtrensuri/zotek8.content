const { Request } = require('./Request')
const LoginRequest = {
    rules: {
        email_username: {
            max: 225,
            required: true,
        },
        password: {
            max: 225,
            required: true,
        }
    },

    messages: {
        email_username: {
            required: 'Email không được để trống',
            max: "Email vượt quá số lượng ký tự cho phép"
        },
        password: {
            regex: "Mật khẩu không đúng định dạng",
            required: "Mật khẩu không được để trống"
        }
    },

    validate: async (req, res, next) => {
        const request = new Request(LoginRequest.rules, LoginRequest.messages);
        return await request.validate(req, res, next);
    },
}

module.exports = {
    LoginRequest
};
