<template>
  <div class="shmap" role="map">
  		<baidu-map class="equipment_map" :scroll-wheel-zoom="true" :center="mapcont" :zoom="zoom" @click="clickMap">
        <bm-marker :position="{lng: data.lng, lat: data.lat}" :dragging="true" @dragend="clickMap"></bm-marker>
	    </baidu-map>
  </div>
</template>

<script>
  import Vue from 'vue';
  import BaiduMap from 'vue-baidu-map'

	Vue.use(BaiduMap, {
	  ak: '8c3e3a75d8742ead58b80b92fd635977'
	})

  export default {
  	name: 'shmap',
    data() {
      return {
      	mapcont: {
	        
	      },
      }
    },
    props:{
  		data: {
        type: Object
    	},
     	zoom: {
        type: Number,
        default: 18
      }
  	},
    methods: {
	    clickMap (e) {
	    	//点击地图更新标注位置
	      this.data.lng = e.point.lng;
	      this.data.lat = e.point.lat;
	      
	      this.$emit('getdata', this.data);
	      
	      //console.log(this.data)
	    }
      
    },
    mounted(){
			this.mapcont.lng = this.data.lng;
	    this.mapcont.lat = this.data.lat;
			/*console.log(this.data)
			console.log(this.zoom)*/
    }

  }
</script>
