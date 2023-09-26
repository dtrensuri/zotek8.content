const db = require('../../../models/index')
const bcrypt = require('bcrypt')
const authController = require('../AuthController')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const timeSheet = require('../TimeSheetController')
const moment = require('moment')
const { Op } = require('sequelize');

const year = moment().year();
const month = moment().month();
const day = moment().day();

const userController = {



    userLogin: async (req, res) => {
        await authController.loginUser(req, res, 3);
    },

    getInfoUser: async (req, res) => {
        return res.status(200).json(req.user);
    },

    getTimeSheets: async (req, res) => {
        const time_sheets = await timeSheet.getTimeSheets(req, res);
        return res.status(200).json(time_sheets);
    },

    searchTimeSheetThisMonth: async (req, res) => {
        const orderBy = req.query.orderBy;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const time_sheets = await timeSheet.searchTimeSheetsByDate(req, res, startDate, endDate, orderBy);
        return res.status(200).json(time_sheets);
    },

    searchTimeSheetLastMonth: async (req, res) => {
        const orderBy = req.query.orderBy;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const time_sheets = await timeSheet.searchTimeSheetsByDate(req, res, startDate, endDate, orderBy);
        return res.status(200).json(time_sheets);
    },

    searchTimeSheetByDate: async (req, res) => {
        const orderBy = req.query.orderBy;
        const { startDate, endDate } = req.query;
        const time_sheets = await timeSheet.searchTimeSheetsByDate(req, res, startDate, endDate, orderBy);
        return res.status(200).json(time_sheets);
    }
}


module.exports = userController