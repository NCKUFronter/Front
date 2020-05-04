/** @typedef { import('lowdb').LowdbSync } LowdbSync  */
const { AsyncJoiSchema, AsyncJoi } = require("./async-joi");
const { existIdRule } = require("./schema");
const Joi = require("@hapi/joi");

function getPointsSchemas(/** @type {LowdbSync} */ db, modelMap) {
  const dbPoint = db.pointActivity;

  const baseSchema = {
    subtype: Joi.number().default(0).min(0),
    detail: Joi.string(),
  };

  const given = AsyncJoi.object({
    ...baseSchema,
    amount: Joi.number().min(1).required(),
    fromId: AsyncJoi.schema(Joi.number().min(0)).addRule(
      existIdRule(db, modelMap.record)
    ),
    toId: AsyncJoi.schema(Joi.number().min(0).required()).addRule(
      existIdRule(db, modelMap.user)
    ),
  });

  const transfer = AsyncJoi.object({
    ...baseSchema,
    amount: Joi.number().min(1).required(),
    fromId: AsyncJoi.schema(Joi.number().min(0).required()).addRule(
      existIdRule(db, modelMap.user)
    ),
    toId: AsyncJoi.schema(Joi.number().min(0).required()).addRule(
      existIdRule(db, modelMap.user)
    ),
  });

  const consume = AsyncJoi.object({
    fromId: AsyncJoi.schema(Joi.number().min(0).required()).addRule(
      existIdRule(db, modelMap.user)
    ),
    toId: AsyncJoi.schema(Joi.number().min(0).required()).addRule(
      existIdRule(db, modelMap.goods)
    ),
  });

  return {
    given,
    transfer,
    consume,
  };
}

function createPointActivity(type, amount, from, to, detail) {
  return {
    type,
    amount,
    from,
    to,
    detail,
    time: new Date().toISOString(),
  };
}

function getPointActions(dbmodel) {
  function givenPoints(subtype, amount, record, user) {
    record.rewardPoints = amount;
    user.rewardPoints = user.rewardPoints + amount;
    const activity = dbmodel.insert(
      createPointActivity(10 + subtype, amount, record._id, user._id)
    );
    console.log({ type: "given", activity });
    return activity;
  }

  function isSafeTransfer(user, amount) {
    return user.rewardPoints < amount;
  }

  // check safe first
  function transferPoints(subtype, amount, fromUser, toUser) {
    fromUser.rewardPoints = fromUser.rewardPoints - amount;
    toUser.rewardPoints = toUser.rewardPoints + amount;

    const activity = dbmodel.insert(
      createPointActivity(20 + subtype, amount, fromUser._id, toUser._id)
    );
    console.log({ type: "transfer", activity });
    return activity;
  }

  // check safe first
  function consumePoints(subtype, user, goods) {
    user.rewardPoints = user.rewardPoints - goods.point;
    const activity = dbmodel
      .insert(
        createPointActivity(30 + subtype, goods.point, user._id, goods._id)
      )
      .value();
    console.log({ type: "consume", user, goods, activity });
    return activity;
  }

  return { givenPoints, transferPoints, consumePoints, isSafeTransfer };
}

module.exports = {
  getPointsSchemas,
  getPointActions,
};
