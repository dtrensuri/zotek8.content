const _ = require('lodash');

class Request {

    constructor(rule = {}, message = {}) {
        this.rules = rule;
        this.messages = message;
        this.failMessages = {};
    }

    defaultMessage = {
        'email': 'email không đúng định dạng.',
        'require': 'không được để trống.',
        'max': "vượt quá số lượng ký tự tối đa",
        'min': "Không đạt số lượng ký tự tối thiểu",
        'regex': "Dữ liệu không đúng định dạng",
        'required': "Dữ liệu không được để trống",
    };

    regexDefault = {
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    }

    pushFailMessage = (fieldName, ruleName) => {

        if (this.messages[fieldName] && this.messages[fieldName][ruleName]) {
            _.merge(this.failMessages, {
                [fieldName]: {
                    [ruleName]: this.messages[fieldName][ruleName]
                }
            });
        } else {

            _.merge(this.failMessages, {
                [fieldName]: {
                    [ruleName]: this.defaultMessage[ruleName]
                }
            });
        }
    }




    email = (request, fieldName, rule) => {
        if (fieldName === 'email' && !this.regexDefault.email.test(request[fieldName])) {
            return false;
        }
        return true;
    }

    min = (request, fieldName, min) => {
        min = _.parseInt(min);

        if (_.size(request[fieldName]) < min) {
            return false;
        }
        return true;
    }

    max(request, fieldName, max) {
        max = _.parseInt(max);
        if (_.size(request[fieldName]) > max) {
            return false;
        }
        return true;
    }

    string = (request, fieldName) => {
        if (!_.isString(request[fieldName])) {
            return false;
        }
        return true;
    }

    required = (request, fieldName) => {
        if (_.isEmpty(request[fieldName])) {
            return false;
        }
        return true;
    }

    email = (request, fieldName) => {
        const regex = this.regexDefault.email;
        if (regex.test(request[fieldName])) {
            return true;
        }
        return false;
    }


    regex = (request, fieldName, regex) => {
        if (!regex.test(request[fieldName])) {
            return false;
        }
        return true;
    };

    validator = (request) => {
        if (this.rules) {
            for (const fieldName in this.rules) {
                if (fieldName && this.rules[fieldName]) {

                    const fieldRules = this.rules[fieldName];
                    for (const ruleName in fieldRules) {

                        const ruleValue = fieldRules[ruleName];

                        if (this[ruleName]) {

                            const check = this[ruleName](request, fieldName, ruleValue);
                            // console.log(check);
                            if (check == false) {
                                this.pushFailMessage(fieldName, ruleName);
                            }
                        }
                    }
                }
            }
        }
        return _.size(this.failMessages) === 0;
    };

    validate = async (req, res, next) => {

        const validate = await this.validator(req.body);
        if (!validate) {
            return res.status(400).json({ messages: "Dữ liệu request không hợp lệ.", errors: this.failMessages });
        }
        return next();
    }
}

module.exports = {
    Request,
}