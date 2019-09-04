import Joi from '@hapi/joi';

const signupSchema = {
	email: Joi.string().strict().trim().min(3).required().email(),
	firstname: Joi.string().strict().trim().min(3).required(),
	lastname: Joi.string().strict().trim().min(3).required(),
	password: Joi.string().strict().trim().min(6).required(),
	address: Joi.string().strict().trim().min(3).required(),
	bio: Joi.string().strict().trim().min(3).required(),
	occupation: Joi.string().strict().trim().min(3).required(),
	expertise: Joi.string().strict().trim().min(3).required()
};

const signinSchema = {
	email: Joi.string().strict().trim().min(3).required().email(),
	password: Joi.string().strict().trim().min(6).required()
};

// export the schema
export default {
	'/auth/signup': signupSchema,
	'/auth/signin': signinSchema
};