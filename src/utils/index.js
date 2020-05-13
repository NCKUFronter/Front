export const backgroundColor = {
  rgba: {},
  hex: "#FAFAFA",
};

export function getLocaleDate(isoDateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" }
  return new Date(isoDateString).toLocaleDateString('zh-TW', options).replace(/\//g, '-');
}

export function filterChangedFields(oldForm, newForm) {
  console.log({newForm, oldForm})
  const result = {};
  for (const key in newForm) {
    if (Array.isArray(newForm[key]) && !arrayEqual(oldForm[key], newForm[key])) {
      result[key] = newForm[key];
    } else if (oldForm[key] !== newForm[key]) {
      result[key] = newForm[key];
    }
  }
  console.log(result)
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
