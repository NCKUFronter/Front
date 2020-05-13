export const backgroundColor = {
  rgba: {},
  hex: "#FAFAFA",
};

export function getLocaleDate(isoDateString) {
  const d = new Date(isoDateString);
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();
  return yy + "-" + mm + "-" + dd;
}

export function filterChangedFields(oldForm, newForm) {
  const result = {};
  for (const key in newForm) {
    if (Array.isArray(newForm[key]) && !arrayEqual(oldForm[key], newForm[key])) {
      result[key] = oldForm[key];
    } else if (oldForm[key] !== newForm[key]) {
      result[key] = oldForm[key];
    }
  }
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
