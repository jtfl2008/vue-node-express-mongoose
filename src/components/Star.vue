<template>
  <div class="star">
    <ul class="stars" @mouseleave="mouseleaveRest">
      <li class="star-item" v-for="(item, index) in 5" :key="index"  @mouseenter="onMouseenter(item)" @click="setCurrentVal(item)" :class="{active: item <= overVal}" ></li>
    </ul>
    
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: 0
  },
  data () {
    return {
      defaultVal: 0,
      overVal: 0
    }
  },
  mounted () {
    this.overVal = this.value
  },
  methods: {
    onMouseenter (item) {
      if (!this.disabled) this.overVal = item
      // console.log(this.overVal)
    },
    setCurrentVal (item) {
      if (!this.disabled) this.defaultVal = item
      this.$emit('onSelect', this.defaultVal)
      // console.log(this.defaultVal)
    },
    mouseleaveRest () {
      if (!this.disabled) this.overVal = this.defaultVal
    }
  }
}
</script>
<style>
.stars{
  font-size: 0;
}
.star-item{
  transition: all 0.3s;
  height: 12px;
  width: 12px;
  display: inline-block;
  background: url("https://gold-cdn.xitu.io/v3/static/img/like.63ed927.svg") 0 0 no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
}
.star-item.active{
  background: url("https://gold-cdn.xitu.io/v3/static/img/like-active.4cdc9b0.svg") 0 bottom no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
}
</style>

<!-- <template>
  <div class="h-rate" :readonly="readonly" @mouseleave="mouseleave()">
    <span  v-for="n in 5" @click="setvalue(n)" :class="starCls(n)" @mouseover="mouseover(n)">
      <i class="h-icon-star-on"></i>
    </span>
    <span v-if="showText" class="h-rate-value">{{value}}</span>
  </div>
</template>
<script>
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      mouseValue: false
    }
  },
  methods: {
    setvalue (value) {
      if (this.readonly) return
      this.$emit('input', value)
      let event = document.createEvent('CustomEvent')
      event.initCustomEvent('setvalue', true, true, this.value)
      this.$el.dispatchEvent(event)
    },
    mouseover (n) {
      if (this.readonly) return
      this.mouseValue = n
    },
    mouseleave () {
      if (this.readonly) return
      this.mouseValue = false
    },
    starCls (n) {
      let v = this.mouseValue || Number(this.value)
      return {
        'h-rate-on': v >= n,
        'h-rate-off': v < n
      }
    }
  },
  filters: {
    isInclude (key, value) {
      return value.includes(key)
    }
  },
  computed: {
  }
}
</script> -->

