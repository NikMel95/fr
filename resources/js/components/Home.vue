<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="menu">
          <ul class="tab tab-block">
            <li :class="'tab-item' + (active_tab == 0 ? ' active':'')">
              <a href="#" @click.prevent="active_tab = 0">Find str</a>
            </li>
            <li :class="'tab-item' + (active_tab == 1 ? ' active':'')">
              <a href="#" @click.prevent="active_tab = 1">SQL</a>
            </li>
          </ul>
        </div>
        <div class="tabs">
          <FindRows v-if="!active_tab"/>
          <Sql v-if="active_tab"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import FindRows from './FindRows';
  import Sql from './Sql';
  export default {
    name: 'Home',
    components: {
      FindRows,
      Sql,
    },
    data() {
      return {
        active_tab: 0
      }
    },
   
    mounted() {    
     
    },
    methods: {
      
    }
  }
</script>
