// @ts-check

/**
 * @typedef {object} SunburstRule
 * @property {(name: string) => string[] } [allLabelsFn] 若有其他要標注的
 * @property {(item: any) => string} labelFn
 * @property {(item: any[]) => any} [labelInfoFn]
 */

export class SunburstLeaf {
  /** @type {string} */
  name;

  /** @type {number} */
  level = 0;

  /** @type {number} */
  size = 0;

  /** @type {SunburstTree | null} */
  parent;

  /** @type {number} 給Sunburst用的 */
  color;

  /**
   * @param {string} name Pie的名稱
   * @param {object[]} items
   * @param {(item: any)=>number} sizeFn
   * @param {SunburstTree} parent
   */
  constructor(name, items, sizeFn, parent) {
    this.name = name;
    this.size = items.reduce((sum, item) => sum + sizeFn(item), 0);
    this.level = parent.level + 1;
    this.parent = parent;
  }
}

export class SunburstTree {
  /** @type {string} */
  name;

  /** @type {number} */
  level = 0;

  /** @type {Array<SunburstTree | SunburstLeaf>} */
  children = [];

  /** @type {SunburstTree} */
  parent;

  /** @type {any} 自行添加的資料 */
  info;

  /** @type {string} 給Sunburst用的 */
  color;

  /**
   * @param {string} name Pie的名稱
   * @param {object[]} items
   * @param {SunburstRule[]} rules 分類規則
   * @param {(item: any)=>number} sizeFn
   * @param {SunburstTree=} parent
   */
  constructor(name, items, rules, sizeFn, parent) {
    this.name = name;
    this.parent = parent;
    if (parent) this.level = parent.level + 1;
    if (rules.length <= this.level)
      throw "rules size must be greater than level";

    // 1. 取得目前層次的分類規則
    const nowRule = rules[this.level];

    // 2. 將所有類別標籤變成物件的key
    const labelDataMap = {};
    if (nowRule.allLabelsFn) {
      for (const label of nowRule.allLabelsFn(name)) {
        labelDataMap[label] = [];
      }
    }

    // 3. 依照rule分類data
    for (const item of items) {
      const label = nowRule.labelFn(item);
      if (!label) continue; // ignore item
      if (!labelDataMap[label]) labelDataMap[label] = [];
      labelDataMap[label].push(item);
    }

    // 4. 查看是否能繼續分類下去
    if (this.level == rules.length - 1) {
      // case 1. 無法分類，產生SunburstLeaf
      for (const label in labelDataMap) {
        this.children.push(
          new SunburstLeaf(label, labelDataMap[label], sizeFn, this)
        );
      }
    } else {
      // case 2. 可分類，產生SunburstTree
      for (const label in labelDataMap) {
        const data = labelDataMap[label];
        const tree = new SunburstTree(label, data, rules, sizeFn, this);
        if (nowRule.labelInfoFn) tree.info = nowRule.labelInfoFn(data);
        this.children.push(tree);
      }
    }
  }
}

/*
import testData from "../data/temp";
const categories = ["", "食物", "交通", "治裝", "娛樂"];
const tree = new SunburstTree(
  "Ledger",
  testData,
  [
    { labelFn: (item) => item.recordType },
    { labelFn: (item) => categories[item.categoryId] },
    { labelFn: (item) => item.hashtags && item.hashtags[0] },
  ],
  (item) => item.money
);
console.log(tree);
*/
