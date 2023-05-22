import axios from 'axios'

// 获取GeoJSON数据
export const getGeoJson = (type, name) => {
  if (type === 'country') return axios.get('/geoJsonColl/china.json')
  if (type === 'province') return axios.get(`/geoJsonColl/province/${name}.json`)
  // 判断是区，县，获取相应数据
  return axios.get(`/geoJsonColl/city/${name}.json`)
}

export const getChinaData = () => {
  return axios.get('/mock/china.json')
}

export const getProvinceData = () => {
  // 判断是省，自治区，直辖市，获取相应数据
  return axios.get('/mock/province.json')
}

export const getCityData = () => {
  // 判断是市，直辖市，获取相应数据
  return axios.get('/mock/city.json')
}
