<template>
  <div class="sql-wrp">
    <div class="sql-form">
      <form @submit.prevent="submit(id)">
        <div class="form-group">
          <input 
            class="form-input" 
            type="text" 
            placeholder="Group id" 
            v-model="id"
            @keyup="validate"
          />
        </div>
        <button class="btn btn-primary btn-sm">Add</button>
      </form>
    </div>
    <button class="btn btn-success btn-sm" @click.prevent="Result">SQL Result</button>
    <button class="btn btn-error btn-sm" @click.prevent="reset">SQL Reset</button>
    <button class="btn btn-primary btn-sm" @click.prevent="test">SQL AddTest</button>
    <div class="loading loading-lg" v-if="load"></div>
    <h2 v-if="show_result">Result</h2>
    <table class="sql-table table" v-if="show_result">
      <thead>
        <tr>
          <th>min_id</th>
          <th>group_id</th>
          <th>count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in result">
          <td>{{item.min_id}}</td>
          <td>{{item.group_id}}</td>
          <td>{{item.count}}</td>
        </tr>
      </tbody>
    </table>
    <h2>Users</h2>
    <table class="sql-table table">
      <thead>
        <tr>
          <th>id</th>
          <th>group_id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{user.id}}</td>
          <td>{{user.group_id}}</td>
          <td><button class="btn btn-primary btn-sm" @click.prevent="del(user.id)">delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { GET_USERS, SQL_RESET, SQL_TEST, ADD_USER, SQL_DELETE, SQL_RESULT } from '../store/actions.type'

  export default {
    name: 'Sql',
    data() {
      return {
        users: [],
        load: true,
        id: '', 
        result: [],
        show_result: false
      }
    },
    computed: {
      ...mapGetters([
        'getUsers',
        'getResult'
      ])
    },
    watch: {
      getUsers (val) {
        this.load = false
        this.users = val
      },
      getResult (val) {
        this.show_result = true
        this.load = false
        this.result = val
      }
    },
    mounted() {   
      this.$store.dispatch(GET_USERS)
    },
    methods: {
      validate(e) {
        this.id = e.target.value.replace(/[^\d]/g,'')
      },
      Result () {
        this.load = true
        this.$store.dispatch(SQL_RESULT)
      },  
      submit (id) {
        if(id != '') {
          this.show_result = false
          this.load = true
          this.$store.dispatch(ADD_USER, id)
          this.id = ''
        }
      },
      reset () {
        this.show_result = false
        this.load = true
        this.$store.dispatch(SQL_RESET)
      },
      test () {
        this.show_result = false
        this.load = true
        this.$store.dispatch(SQL_TEST)
      },
      del (id) {
        this.show_result = false
        this.load = true
        this.$store.dispatch(SQL_DELETE, id)
      }
    }
  }
</script>
