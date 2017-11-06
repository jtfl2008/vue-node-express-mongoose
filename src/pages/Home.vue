<template>
  <div class="home">
    <v-header></v-header>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import Header from '../components/header.vue'
  export default {
    data () {
      return {

      }
    },
    components: {
      vHeader: Header
    }
  }
</script>

