const authRouter = require('./auth/auth.router');
const userRouter = require('./user/user.router');
const vehicleRouter = require('./vehicle/vehicle.router');
const adminRouter = require('./admin/admin.router');



module.exports = {
   authRouter,
   userRouter,
   vehicleRouter,
   adminRouter
};