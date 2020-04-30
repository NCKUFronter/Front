/** @typedef { import('lowdb').LowdbSync } LowdbSync  */
// @ts-check
const { AsyncJoiSchema, AsyncJoi } = require("./async-joi");
const Joi = require("@hapi/joi");

function existInDB(/** @type LowdbSync */ db, name, field) {
  return {
    name: "existInDB",
    args: { db, name, field },
    validate: async (value, args, options) => {
      const dbmodel = args.db.get(args.name);
      if (dbmodel.filter({ _id: value }).value()) return { value };
      else return { value, error: `${args.name} has no ${args.field} = ${value}` };
    },
  };
}

function existIdRule(/** @type LowdbSync */ db, name) {
  return {
    name: "existId",
    args: { db, name },
    validate: async (value, args, options) => {
      const dbmodel = args.db.get(args.name);
      if (dbmodel.getById(value).value()) return { value };
      else return { value, error: `${args.name} has no _id = ${value}` };
    },
  };
}

function idSchema(db, name) {
  return AsyncJoi.schema(JoiRequireWhen(Joi.number().min(1))).addRule(
    existIdRule(db, name)
  );
}

function JoiRequireWhen(schema) {
  return schema.when("$partial", {
    is: true,
    otherwise: Joi.required(),
  });
}

async function runAsyncTest(/** @type LowdbSync */ db) {
  const schema = AsyncJoi.object({
    money: JoiRequireWhen(Joi.number().min(0)),
    ledgerId: AsyncJoi.schema(Joi.number().min(0)).addRule(
      existIdRule(db, "ledgers")
    ),
  });
  const a = (result) => console.log(result);
  await schema.validate({ ledgerId: 1, money: "5" }).then(a);
  await schema.validate({ ledgerId: 4, money: 5 }).then(a);
  await schema.validate({ ledgerId: 2 }).then(a);
}

function getSchemas(db, modelMap) {
  const RecordSchema = AsyncJoi.object(
    {
      recordType: JoiRequireWhen(Joi.string().valid("income", "expense")),

      money: JoiRequireWhen(Joi.number().min(0)),

      // 或許放在url內比較好 '/ledger/:ledgerId/record'
      ledgerId: idSchema(db, modelMap.ledger),
      categoryId: idSchema(db, modelMap.category),

      // 應該辨識使用者身份自動填入
      // userId: JoiRequireWhen(Joi.number().min(0)),

      date: JoiRequireWhen(Joi.date()),

      hashtags: Joi.array().items(Joi.string()),

      detail: Joi.string(),
    },
    Joi.required().not({})
  );

  const LedgerSchema = AsyncJoi.object(
    {
      name: JoiRequireWhen(Joi.string()),
    },
    Joi.required().not({})
  );

  const CategorySchema = AsyncJoi.object(
    {
      name: JoiRequireWhen(Joi.string()),
    },
    Joi.required().not({})
  );

  const UserSchema = AsyncJoi.object(
    {
      name: JoiRequireWhen(Joi.string()),

      password: JoiRequireWhen(Joi.string()),

      email: JoiRequireWhen(Joi.string()),
    },
    Joi.required().not({})
  );

  return {
    record: RecordSchema,
    ledger: LedgerSchema,
    user: UserSchema,
    category: CategorySchema,
  };
}

function paramIdSchema(db, name) {
  return AsyncJoi.object({ id: idSchema(db, name) }, Joi.required());
}

module.exports = {
  getSchemas,
  runAsyncTest,
  existIdRule,
  idSchema,
  paramIdSchema,
};
