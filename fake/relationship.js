// @ts-check
const { modelMap } = require("./model-utils");

const expandMap = {
  ledger(expand) {
    return {
      admin: "user",
    }[expand];
  },
  record(expand) {
    return {
      category: "category",
      ledger: "ledger",
    }[expand];
  },
  pointActivity(expand, activity) {
    const type = activity.type;
    if (type >= 10 && type < 20) {
      return {
        from: "record",
        to: "user",
      }[expand];
    } else if (type >= 20 && type < 30) {
      return {
        from: "user",
        to: "user",
      }[expand];
    } else {
      return {
        from: "user",
        to: "goods",
      }[expand];
    }
  },
  invitation(expand) {
    return {
      fromUser: "user",
      toUser: "user",
      ledger: "ledger",
    }[expand];
  },
};

const embedMap = {
  ledger(embed) {
    return {
      user: "user",
    }[embed];
  },
};

function addRelationshipRouter(router, dbmodels) {
  function mergeExpand(model, expand, entity) {
    const expand_model = expandMap[model] && expandMap[model](expand, entity);
    if (!expand_model) return;
    const id = entity[expand + "Id"];
    const expand_entity = dbmodels[expand_model].getById(id).value();
    if (expand_entity) {
      entity[expand] = expand_entity;
    }
  }

  function mergeEmbed(model, embed, entity) {
    const embed_model = embedMap[model] && embedMap[model](embed);
    if (!embed_model) return;
    const ids = entity[embed + "Ids"];
    if (!ids) return;
    const embed_entities = ids
      .map((id) => dbmodels[embed_model].getById(id))
      .value();
    if (embed_entities) {
      entity[modelMap[embed]] = embed_entities;
    }
  }

  router.get("/:resource", (req, res, next) => {
    const model = req.params.resource;
    if (!modelMap[req.params.resource]) return next();

    const entities = dbmodels[model]
      .value()
      .map((item) => Object.assign({}, item));
    let expands = req.query._expand;
    let embeds = req.query._embed;

    if (!Array.isArray(expands)) expands = [expands];
    if (!Array.isArray(embeds)) embeds = [embeds];

    for (const entity of entities) {
      for (const expand of expands) mergeExpand(model, expand, entity);
      for (const embed of embeds) mergeEmbed(model, embed, entity);
    }

    res.status(200).json(entities);
  });

  router.get("/:resource/:id", (req, res, next) => {
    const model = req.params.resource;
    if (!modelMap[req.params.resource]) return next();
    let entity = dbmodels[model].getById(req.params.id).value();
    if (!entity) return res.status(200).json();
    else entity = Object.assign({}, entity);

    let expands = req.query._expand;
    let embeds = req.query._embed;

    if (!Array.isArray(expands)) expands = [expands];
    if (!Array.isArray(embeds)) embeds = [embeds];
    for (const expand of expands) mergeExpand(model, expand, entity);
    for (const embed of embeds) mergeEmbed(model, embed, entity);

    res.status(200).json(entity);
  });
}

module.exports = {
  addRelationshipRouter,
};
