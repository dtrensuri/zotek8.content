const db = require('../../models/index');
const { Op } = require('sequelize');
const _ = require('lodash');

const timeSheet = {
    work_time: {
        time_shift: {
            ca1: {
                name: "Ca sáng",
                time_in: "8:00",
                time_out: "12:00"
            },
            ca2: {
                name: "Ca chiều",
                time_in: "13:00",
                time_out: "17:30"
            }
        }
    },

    getTimeSheets: async (req, res) => {
        try {
            let id_employee = req.employee.id;
            const page = _.parseInt(req.query.page) || 1;
            const perPage = _.parseInt(req.query.perPage) || 50;
            const offset = (page - 1) * perPage;

            let time_sheets = await db.TimeSheet.findAll({
                where: {
                    employee_id: id_employee,
                },
                limit: (perPage),
                offset: (offset),
                raw: true,
                nest: true,
            })

            let time_sheets_count = await db.TimeSheet.count(
                {
                    where: {
                        employee_id: id_employee,
                    }
                }
            );

            return {
                perPage: perPage,
                page: page,
                offset: offset,
                results: time_sheets,
                total: time_sheets_count,
                numPage: _.ceil(time_sheets_count / perPage),
                count: _.size(time_sheets)
            };
        } catch (e) {
            console.error(e.message)
        };
    },

    searchTimeSheetsByDate: async (req, res, startDate, endDate, orderBy) => {
        try {
            let id_employee = req.employee.id;
            const page = _.parseInt(req.query.page) || 1;
            const perPage = _.parseInt(req.query.perPage) || 50;
            const offset = (page - 1) * perPage;

            let time_sheets = await db.TimeSheet.findAll({
                where: {
                    employee_id: id_employee,
                    date: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                limit: (perPage),
                offset: (offset),
                raw: true,
                nest: true,
                order: [[db.sequelize.col('date'), orderBy]]
            })

            let time_sheets_count = await db.TimeSheet.count(
                {
                    where: {
                        employee_id: id_employee,
                        date: {
                            [Op.between]: [startDate, endDate],
                        },
                    }
                }
            );

            return {
                perPage: perPage,
                page: page,
                offset: offset,
                results: time_sheets,
                total: time_sheets_count,
                numPage: _.ceil(time_sheets_count / perPage),
                count: _.size(time_sheets)
            };
        } catch (e) {
            console.log(e.message)
        };
    }


}

module.exports = timeSheet