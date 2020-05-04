/** @typedef { import('lowdb').LowdbSync } LowdbSync  */
const modelMap = {
  record: "records",
  category: "categories",
  ledger: "ledgers",
  user: "users",
  pointActivity: "pointActivities",
  goods: "goods",
  invitation: "invitations",
};
const models = Object.keys(modelMap);

function DBModels(/** @type {LowdbSync} */ db) {
  return {
    record: db.get(modelMap.record),
    category: db.get(modelMap.category),
    ledger: db.get(modelMap.ledger),
    user: db.get(modelMap.user),
    pointActivity: db.get(modelMap.pointActivity),
    goods: db.get(modelMap.goods),
    invitation: db.get(modelMap.invitation)
  };
}

// 將 json server 設定的複數 routes 轉成 現在後端的單數
function modelRoutes() {
  const routerMap = {};
  for (const key of models) {
    routerMap[`/${key}*`] = `/${modelMap[key]}$1`;
  }
  return routerMap;
}

module.exports = {
  modelRoutes,
  models,
  modelMap,
  DBModels,
};
