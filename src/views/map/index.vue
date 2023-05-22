<template>
  <div id="map">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
