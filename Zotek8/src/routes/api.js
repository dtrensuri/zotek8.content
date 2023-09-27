const express = require('express');
const router = express.Router();
const UserManagerController = require('../http/controller/AdminController/UserManagerController');
const adminController = require('../http/controller/AdminController/AdminController');
const userController = require('../http/controller/UserController/UserController');
const authMiddleware = require('../http/middleware/AuthMiddleware');
const { LoginRequest } = require('../http/request/LoginRequest');


const initApiRoute = (app) => {
    router.post('/admin/login', LoginRequest.validate, adminController.adminLogin)
    router.get('/admin/get-all-user', UserManagerController.getAllUsers)
    router.get('/admin/get-admin-info', authMiddleware.verifyToken, adminController.getInfoAdmin)

    router.post('/user/login', LoginRequest.validate, userController.userLogin)
    router.get('/user/get-info', authMiddleware.verifyToken, userController.getInfoUser)
    router.get('/user/get-time-sheets', authMiddleware.verifyToken, userController.getTimeSheets)
    router.get('/user/search-timesheet/this-month', authMiddleware.verifyToken, userController.searchTimeSheetThisMonth)
    router.get('/user/search-timesheet/last-month', authMiddleware.verifyToken, userController.searchTimeSheetLastMonth)
    router.get('/user/search-timesheet/find-by-date', authMiddleware.verifyToken, userController.searchTimeSheetByDate)
    app.use('/api', router);
};

module.exports = {
    initApiRoute
}