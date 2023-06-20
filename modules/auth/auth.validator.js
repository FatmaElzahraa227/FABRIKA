const Joi = require("joi");

const signUp = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required().min(3).max(15),
      lastName: Joi.string().required().min(3).max(15),
      gender: Joi.string(),
      email: Joi.string().email().required(),
      phone: Joi.string().required().min(11).max(11),
      password: Joi.string().required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};
const signUpMobile = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      gender: Joi.string(),
      password: Joi.string().required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};

const signIn = {
  body: Joi.object().required().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object()
    .required()
    .keys({
      newPassword: Joi.string().required(),
      cnewPassword: Joi.string().valid(Joi.ref("newPassword")),
    }),
    params:Joi.object().required().keys({
      email: Joi.string().email().required(),
    })
};
const codeVerification = {
  body: Joi.object().required().keys({
    code: Joi.number().required(),
  }),
};

const verifyCode = {
  params: Joi.object().required().keys({
    useremail: Joi.string().email().required(),
  }),
  body: Joi.object()
    .required()
    .keys({
      userCode: Joi.number().required().min(4).max(4),
    }),
};

const forgotPassword = {
  body: Joi.object().required().keys({
    email: Joi.string().email().required(),
  }),
};

const changePassword = {
  body: Joi.object().required().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    cnewPassword: Joi.string().valid(Joi.ref("newPassword")),
  }),
  params: Joi.object().required().keys({
    email: Joi.string().email().required()
  })
  };


module.exports = {
  signUp,
  signIn, 
  forgotPassword,
  verifyCode,
  resetPassword,
  codeVerification,
  signUpMobile,
  changePassword
};  
