const json = {
    "name": "Ledger",
    "children": [{
        "name": "1_MainAccount",
        "children": [{
            "name": "1.1_Income",
            "children": [{
                    "name": "1.1.1_fullTime",
                    "size": "5000"
                },
                {
                    "name": "1.1.2_partTime",
                    "size": "5000"
                }
            ]
        }, {
            "name": "1.2_Expense",
            "children": [{
                "name": "1.2.1_食物",
                "children": [{
                        "name": "早餐",
                        "size": "571"
                    },
                    {
                        "name": "午餐",
                        "size": "1916"
                    },
                    {
                        "name": "晚餐",
                        "size": "1478"
                    }
                ]
            }, {
                "name": "1.2.2_交通",
                "children": [{
                        "name": "高鐵",
                        "size": "1010"
                    },
                    {
                        "name": "台鐵",
                        "size": "371"
                    },
                    {
                        "name": "客運",
                        "size": "1311"
                    }
                ]
            }, {
                "name": "1.2.3_治裝",
                "children": [{
                        "name": "上衣",
                        "size": "599"
                    },
                    {
                        "name": "長褲",
                        "size": "648"
                    },
                    {
                        "name": "外套",
                        "size": "0"
                    }
                ]
            }, {
                "name": "1.2.4_娛樂",
                "children": [{
                        "name": "電影",
                        "size": "200"
                    },
                    {
                        "name": "KTV",
                        "size": "157"
                    }
                ]
            }]
        }]
    }, {
        "name": "2_BankSinoPac",
        "children": [{
            "name": "2.1_Gain",
            "children": [{
                    "name": "2.1.1_每筆點數",
                    "size": "12000"

                }, {
                    "name": "2.1.2_永豐點數",
                    "children": [{
                        "name": "2.1.2.1_食物",
                        "children": [{
                                "name": "早餐",
                                "size": "0"
                            },
                            {
                                "name": "午餐",
                                "size": "0"
                            },
                            {
                                "name": "晚餐",
                                "size": "0"
                            }
                        ]
                    }, {
                        "name": "2.1.2.2_交通",
                        "children": [{
                                "name": "高鐵",
                                "size": "2020"
                            },
                            {
                                "name": "台鐵",
                                "size": "742"
                            },
                            {
                                "name": "客運",
                                "size": "420"
                            }
                        ]
                    }, {
                        "name": "2.1.2.3_治裝",
                        "children": [{
                                "name": "上衣",
                                "size": "1200"
                            },
                            {
                                "name": "長褲",
                                "size": "796"
                            },
                            {
                                "name": "外套",
                                "size": "0"
                            }
                        ]
                    }, {
                        "name": "2.1.2.4_娛樂",
                        "children": [{
                                "name": "電影",
                                "size": "400"
                            },
                            {
                                "name": "KTV",
                                "size": "0"
                            }
                        ]
                    }]
                },
                {
                    "name": "2.1.3_每天點數",
                    "size": "1500"
                },
                {
                    "name": "2.1.4_連續點數",
                    "size": "300"
                }
            ]
        }, {
            "name": "2.2_Redeem",
            "children": [{
                    "name": "虛寶1",
                    "size": "2000"
                },
                {
                    "name": "虛寶2",
                    "size": "1500"
                },
                {
                    "name": "虛寶3",
                    "size": "1000"
                },
                {
                    "name": "虛寶4",
                    "size": "1200"
                }
            ]
        }]
    }]
}

function addParent(obj, level = 0) {
    obj.level = level;
    if(!obj.children) return;
    for(const child of obj.children) {
        child.parent = obj;
        addParent(child, level+1);
    }
}

addParent(json);
console.log(json)

export default json; 
