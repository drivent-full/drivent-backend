import Joi from 'joi';

export const subscribeSchema = Joi.object({
  activityId: Joi.number().required(),
});
