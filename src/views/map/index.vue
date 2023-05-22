<template>
  <div class="map-wrapper">
    <h2>地图三级下钻</h2>
    <MapDrilling></MapDrilling>
  </div>
</template>

<script>
import MapDrilling from '@/components/MapDrilling'
export default {
  name: 'Map',
  components: {
    MapDrilling,
  },
}
</script>

<style lang="less">
.map-wrapper {
  width: 100%;
  height: 100%;
  padding: 16px;
  h2 {
    font-size: 24px;
    margin-bottom: 12px;
  }
}
</style>
