/** @typedef { import('lowdb').LowdbSync } LowdbSync  */
const jsonServer = require("json-server");
// const fileUpload = require("express-fileupload");
const { models, modelMap, modelRoutes, DBModels } = require("./model-utils");
const convertDtos = require("./convertDto");
const { getSchemas, runAsyncTest, paramIdSchema } = require("./schema");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
/** @type { LowdbSync } */ const db = router.db;

const dbmodels = DBModels(db);
const schemas = getSchemas(db, modelMap);
const { getPointActions, getPointsSchemas } = require("./point-utils");
const { addRelationshipRouter } = require("./relationship");
const pointActions = getPointActions(dbmodels);
const pointSchemas = getPointsSchemas(db, modelMap);
// runAsyncTest(router.db);

/* --- add basic middlewared --- */
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
// server.use(fileUpload());

/* --- login/logout/profile --- */
let nowUser = dbmodels.user.value()[0];

function loginPipe(req, res, next) {
  if (!nowUser) res.status(401).json("Not LoggedIn");
  else next();
}

server.get("/login/auth/google", (req, res) => {
  res.redirect(302, "/login/auth/google/callback");
});

server.get("/login/auth/google/callback", (req, res) => {
  nowUser = dbmodels.user.value()[0];
  res.json(nowUser);
});

server.post("/signup", (req, res) => {
  res.redirect(307, "/users");
});

server.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    const user = dbmodels.user.filter(req.body);

    if (user) {
      nowUser = user;
      res.status(200).json(user);
    } else res.status(401).json("帳號或密碼錯誤");
  } else res.status(400).json("請輸入帳號與密碼");
});

server.get("/user/profile", loginPipe, (req, res) => {
  if (!nowUser) res.status(401).json("Not loggedIn");
  else res.status(200).json(nowUser);
});

server.post("/logout", (req, res) => {
  if (!nowUser) res.status(401).json("Not loggedIn");
  else {
    nowUser = null;
    res.status(200).json("Logout Success");
  }
});

/* --- CRUD --- */
server.use("/:resource", async (req, res, next) => {
  if (models.indexOf(req.params.resource) >= 0) {
    // return 404 if not loggedIn
    if (!nowUser) return res.status(401).json("Not LoggedIn");

    const model = req.params.resource;
    if (model === "pointActivity" && req.method !== "GET")
      return res.status(404).end();

    if (req.method === "POST" || req.method === "PUT") {
      validatePipe(
        { schema: schemas[model], convertDto: convertDtos[model] },
        { req, res, next }
      );
    } else if (req.method == "PATCH") {
      validatePipe(
        {
          schema: schemas[model],
          options: { context: { partial: true } },
          convertDto: convertDtos[model],
        },
        { req, res, next }
      );
    } else next();
  } else next();
});

/* --- point activity --- */
server.post(
  "/points/given",
  getValidatePipe(pointSchemas.given, convertDtos.self),
  function (req, res) {
    const body = req.body;
    const record = body.fromId ? dbmodels.record.getById(body.fromId) : null;
    const user = dbmodels.user.getById(body.toId);
    const result = pointActions.givenPoints(
      body.subtype,
      body.amount,
      record,
      user
    );
    db.write();
    return res.json(result);
  }
);

server.post(
  "/points/transer",
  getValidatePipe(pointSchemas.transfer, convertDtos.self),
  function (req, res) {
    const body = req.body;
    const fromUser = dbmodels.record.getById(body.fromId);
    const toUser = dbmodels.user.getById(body.toId);
    if (!pointActions.isSafeTransfer(fromUser, body.amount)) {
      res.status(400).json("Has no amount to transfer");
      return;
    }
    const result = pointActions.givenPoints(
      body.subtype,
      body.amount,
      fromUser,
      toUser
    );
    db.write();
    return res.json(result);
  }
);

server.post("/points/consume", function (req, res) {
  const body = req.body;
  const fromUser = dbmodels.record.getById(body.fromId);
  const goods = dbmodels.goods.getById(body.toId);
  if (!pointActions.isSafeTransfer(fromUser, body.amount)) {
    res.status(400).json("Has no amount to transfer");
    return;
  }
  const result = pointActions.givenPoints(
    body.subtype,
    body.amount,
    fromUser,
    goods
  );
  db.write();
  return res.json(result);
});

/* --- invitation --- */
server.post(
  "/ledger/:id/invite",
  loginPipe,
  getValidatePipe(paramIdSchema(db, modelMap.ledger)),
  function (req, res) {
    const ledger = dbmodels.ledger.getById(req.body.id).value();
    if (ledger.adminId !== nowUser._id)
      res.status(401).json("沒有權限訪問帳簿");

    const invited_user = dbmodels.user.getById(req.body.email).value();
    if (!invited_user) return res.status(400).json("邀請的使用者不存在");

    const invitation = dbmodels.invitation
      .insert({
        fromUserId: nowUser._id,
        toUserId: invited_user._id,
        ledgerId: ledger._id,
        type: 2,
      })
      .value();
    db.write();
    res.status(201).json(invitation);
  }
);

server.get("/user/ledger", loginPipe, (req, res) => {});

server.put(
  "/user/invitation/:id",
  getValidatePipe(paramIdSchema(db, modelMap.invitation)),
  (req, res) => {
    const invitation = dbmodels.invitation.getById(req.body.id).value();
    if (invitation.toUserId !== nowUser._id) {
      return res.status(403).json("沒有權限訪問此資源");
    }

    if (req.body.answer !== 0 && req.body.answer !== 1) {
      return res.status(400).json("無效答案");
    }
    invitation.type = req.body.answer;
    db.write();
    if (invitation.type == 1) {
    }
  }
);

server.get("/user/invitation", loginPipe, (req, res) => {
  res
    .status(200)
    .json(dbmodels.invitation.filter({ toUserId: nowUser._id }).value());
});

/* --- validatePipe --- */
// valiate schema and convert
function getValidatePipe(schema, convertDto, options, position = "body") {
  return async (req, res, next) => {
    return validatePipe(
      { schema, convertDto, options, position },
      { req, res, next }
    );
  };
}
async function validatePipe(
  { schema, convertDto, options, position = "body" },
  { req, res, next }
) {
  const { error, value, hasError } = await schema.validate(
    req[position],
    Object.assign({ abortEarly: false }, options)
  );
  if (hasError) {
    res.status(400).json({ [position + "_schema_error"]: error });
    return false;
  } else {
    req[position + "_origin"] = req.body;
    req[position] = convertDto ? convertDto(value, nowUser, req) : value;
    next();
    return true;
  }
}

/* --- swagger --- */
/*
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// swagger setting
const definition = {
  openapi: "3.0.0",
  info: {
    title: "Fake Json Server",
    version: "0.0.1",
  },
};

const specs = swaggerJsdoc({
  definition,
  apis: ["./swagger.js"],
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
*/

/* --- add json server routers --- */
// set id to "_id"
router.db._.id = "_id";
addRelationshipRouter(server, dbmodels);
server.use(jsonServer.rewriter(modelRoutes()));
server.use(router);
server.get("/:resource", (req, res, next) => {
  console.log(res.locals.data);
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});
