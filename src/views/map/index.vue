<template>
  <div class="map-wrapper">
    <h2>地图三级下钻演示</h2>
    <MapDrilling class="mapdriliing"></MapDrilling>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: no-repeat 2% 5% url('../../assets/images/bg.png');
  h2 {
    color: #fff;
    font-size: 24px;
    margin-top: 16px;
    margin-bottom: 28px;
  }
  .mapdriliing{
    width: 60%;
    height: calc(100% - 24px - 16px - 28px);
  }
}
</style>
