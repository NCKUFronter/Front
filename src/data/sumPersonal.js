const json = {
  name: "Personal",
  children: [
    {
      name: "CashFlow",
      children: [
        {
          name: "Income",
          children: [
            { name: "fullTime", size: "5000" },
            { name: "partTime", size: "5000" },
          ],
        },
        {
          name: "Expense",
          children: [
            {
              name: "食物",
              children: [
                { name: "早餐", size: "571" },
                { name: "午餐", size: "1916" },
                { name: "晚餐", size: "1478" },
              ],
            },
            {
              name: "交通",
              children: [
                { name: "高鐵", size: "1010" },
                { name: "台鐵", size: "371" },
                { name: "客運", size: "1311" },
              ],
            },
            {
              name: "治裝",
              children: [
                { name: "上衣", size: "599" },
                { name: "長褲", size: "648" },
                { name: "外套", size: "0" },
              ],
            },
            {
              name: "娛樂",
              children: [
                { name: "電影", size: "200" },
                { name: "KTV", size: "157" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "RewardPoints",
      children: [
        {
          name: "Gain",
          children: [
            {
              name: "每筆點數",
              children: [
                {
                  name: "食物",
                  children: [
                    { name: "早餐", size: "285" },
                    { name: "午餐", size: "958" },
                    { name: "晚餐", size: "739" },
                  ],
                },
                {
                  name: "交通",
                  children: [
                    { name: "高鐵", size: "0" },
                    { name: "台鐵", size: "0" },
                    { name: "客運", size: "550" },
                  ],
                },
                {
                  name: "治裝",
                  children: [
                    { name: "上衣", size: "300" },
                    { name: "長褲", size: "150" },
                    { name: "外套", size: "0" },
                  ],
                },
                {
                  name: "娛樂",
                  children: [
                    { name: "電影", size: "0" },
                    { name: "KTV", size: "79" },
                  ],
                },
              ],
            },
            {
              name: "永豐點數",
              children: [
                {
                  name: "食物",
                  children: [
                    { name: "早餐", size: "0" },
                    { name: "午餐", size: "0" },
                    { name: "晚餐", size: "0" },
                  ],
                },
                {
                  name: "交通",
                  children: [
                    { name: "高鐵", size: "2020" },
                    { name: "台鐵", size: "742" },
                    { name: "客運", size: "420" },
                  ],
                },
                {
                  name: "治裝",
                  children: [
                    { name: "上衣", size: "1200" },
                    { name: "長褲", size: "796" },
                    { name: "外套", size: "0" },
                  ],
                },
                {
                  name: "娛樂",
                  children: [
                    { name: "電影", size: "400" },
                    { name: "KTV", size: "0" },
                  ],
                },
              ],
            },
            { name: "每天點數", size: "1500" },
            { name: "連續點數", size: "300" },
          ],
        },
        {
          name: "Redeem",
          children: [
            { name: "虛寶1", size: "2000" },
            { name: "虛寶2", size: "1500" },
            { name: "虛寶3", size: "1000" },
            { name: "虛寶4", size: "1200" },
          ],
        },
      ],
    },
  ],
};

function addParent(obj, level = 0) {
  obj.level = level;
  if (!obj.children) return;
  for (const child of obj.children) {
    child.parent = obj;
    addParent(child, level + 1);
  }
}

addParent(json);
// console.log(json);

export default json;
