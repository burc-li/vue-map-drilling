// 23个省
const PROVINCE = [
  {
    adcode: 130000,
    name: '河北',
  },
  {
    adcode: 140000,
    name: '山西',
  },
  {
    adcode: 210000,
    name: '辽宁',
  },
  {
    adcode: 220000,
    name: '吉林',
  },
  {
    adcode: 230000,
    name: '黑龙江',
  },
  {
    adcode: 320000,
    name: '江苏',
  },
  {
    adcode: 330000,
    name: '浙江',
  },
  {
    adcode: 340000,
    name: '安徽',
  },
  {
    adcode: 350000,
    name: '福建',
  },
  {
    adcode: 360000,
    name: '江西',
  },
  {
    adcode: 370000,
    name: '山东',
  },
  {
    adcode: 410000,
    name: '河南',
  },
  {
    adcode: 420000,
    name: '湖北',
  },
  {
    adcode: 430000,
    name: '湖南',
  },
  {
    adcode: 440000,
    name: '广东',
  },
  {
    adcode: 460000,
    name: '海南',
  },
  {
    adcode: 510000,
    name: '四川',
  },
  {
    adcode: 520000,
    name: '贵州',
  },
  {
    adcode: 530000,
    name: '云南',
  },
  {
    adcode: 610000,
    name: '陕西',
  },
  {
    adcode: 620000,
    name: '甘肃',
  },
  {
    adcode: 630000,
    name: '青海',
  },
  {
    adcode: 710000,
    name: '台湾',
  }]

// 5个自治区
const AUTONOMOUS_REGION = [{
  adcode: 150000,
  name: '内蒙古',
}, {
  adcode: 450000,
  name: '广西',
}, {
  adcode: 540000,
  name: '西藏',
}, {
  adcode: 640000,
  name: '宁夏',
}, {
  adcode: 650000,
  name: '新疆',
}]

// 4个直辖市 (centrally administered municipality)
const CAM = [{
  adcode: 110000,
  name: '北京',
}, {
  adcode: 120000,
  name: '天津',
}, {
  adcode: 310000,
  name: '上海',
}, {
  adcode: 500000,
  name: '重庆',
}]

// 2个特别行政区 (special administrative region)
const SAR = [{
  adcode: 810000,
  name: '香港',
}, {
  adcode: 820000,
  name: '澳门',
}]

// 有二级地图 （23个省、5个自治区、4个直辖市、2个特别行政区）
export const EXISTING_SECOND_LAYER_REGION = [...PROVINCE, ...AUTONOMOUS_REGION, ...CAM, ...SAR]

// 有三级地图 （23个省、5个自治区 的市级区域）
export const EXISTING_THIRD_LAYER_REGION = [...PROVINCE, ...AUTONOMOUS_REGION]

// 九段线 adcode
export const JD_ADCODE = 100000
// 中国台湾省 adcode
export const TAIWAN_ADCODE = 710000
