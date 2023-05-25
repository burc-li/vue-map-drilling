import axios from 'axios'

// 获取GeoJSON数据
export const getGeoJson = (type, name) => {
  if (type === 'country') return axios.get('/geoJsonColl/china.json')
  if (type === 'province') return axios.get(`/geoJsonColl/province/${name}.json`)
  return axios.get(`/geoJsonColl/city/${name}.json`)
}

// 获取中国数据
export const getChinaData = () => {
  return axios.get('/mock/china.json')
}

// 获取省、直辖市、自治区的数据（山东省）
export const getProvinceData = () => {
  return axios.get('/mock/province.json')
}

// 获取区、县的数据（济南市）
export const getCityData = () => {
  return axios.get('/mock/city.json')
}
