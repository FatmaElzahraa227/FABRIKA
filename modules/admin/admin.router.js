const { getQA, getNotifications, retrieveMessages,userChart, getEventReq, reviewEvent } = require("./controller/admin.controller");
const userAPI = require("../user/userRoles.js");
const userVal = require("./admin.validator");
const router = require("express").Router();


router.get("/getFAQ", getQA );
router.get("/getNewNotifications", getNotifications );
router.get("/getMessages", retrieveMessages );
router.get("/userChart", userChart );
router.get("/showEventReqs", getEventReq);
router.patch("/ApproveOrDeny/:eventID", reviewEvent);


module.exports = router;  