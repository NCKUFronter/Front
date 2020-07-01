import Vue from 'vue'

export const backgroundColor = {
  rgba: {},
  hex: "#FAFAFA",
};

export function getLocaleDate(isoDateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(isoDateString)
    .toLocaleDateString("zh-TW", options)
    .replace(/\//g, "-");
}

export function filterChangedFields(oldForm, newForm) {
  console.log({ newForm, oldForm });
  const result = {};
  for (const key in newForm) {
    if (
      Array.isArray(newForm[key]) &&
      !arrayEqual(oldForm[key], newForm[key])
    ) {
      result[key] = newForm[key];
    } else if (oldForm[key] !== newForm[key]) {
      result[key] = newForm[key];
    }
  }
  console.log(result);
  return result;
}

export function arrayEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const rules = {
  recordType: { labelFn: (item) => item.recordType },
  category: { labelFn: (item) => item.category.name },
  // hashtags: { labelFn: (item) => item.hashtags && item.hashtags[0] },
  ledgers: { labelFn: (item) => item.ledgers },
};

export function newPointSubtypeName(subtype) {
  if (subtype == "record") {
    return "帳目紀錄";
  } else if (subtype == "sinoPac") {
    return "永豐紀錄";
  } else if (subtype == "perLogin") {
    return "登入點數";
  } else if (subtype == "continueLogin") {
    return "連續登入點數";
  } else {
    return "NewOther";
  }
}

export function ignoreNotLoginError(err) {
  if (err.response.status === 401) return;
  else throw err;
}

const nameMap = {
  recordType(name) {
    return {
      income: "收入",
      expense: "支出",
    }[name];
  },
  type(name) {
    return {
      new: "新增",
      transfer: "轉移",
      consume: "消費",
    }[name];
  },
  subtype(name) {
    if (name == "") return "全部";
    else
      return {
        perLogin: "每日登入",
        continueLogin: "連續登入",
        sinoPac: "永豐",
        record: "記帳",
      }[name];
  },
  flow(name) {
    return {
      in: "獲得",
      out: "使用",
    }[name];
  },
  user(name) {
    if(name == "") return "自己";
    else if(name == Vue.$api.user.profile.name) return "自己";
    else return name;
  }
};

export function summaryAddParent(obj, level = 0) {
  obj.level = level;
  if (!obj.children) return;
  if (obj.children.length == 0) {
    delete obj.children;
    return;
  }

  const map = nameMap[obj.child_type_name];
  for (const child of obj.children) {
    if(!child.name) child.name = "";
    child.parent = obj;
    if (map != null) {
      child.name = map(child.name);
    }
    summaryAddParent(child, level + 1);
  }
  return obj;
}
