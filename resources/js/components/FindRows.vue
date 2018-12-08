<template>
  <div class="findrows-wrp">
    <div :class="'findrows-form' + (remote ? ' remote':'')">
      <form @submit.prevent="Search(file, str)">
        <div class="findrows-form__select" v-if="!remote">
          <div class="loading loading-lg" v-if="load_s"></div>
          <div :class="'form-group' + (file_error ? ' has-error': '')" v-if="!load_s">
            <select class="form-select" v-model="file">
              <option value="">Chose file</option>
              <option v-for="file in files" :value="file">{{file}}</option>
            </select>
            <p class="form-input-hint" v-if="file_error">Select file</p>
          </div>
        </div>
        <div class="findrows-form__input" v-if="remote">
          <div :class="'input-group' + (url_error ? ' has-error': '')">
            <input 
              class="form-input" 
              type="text" 
              placeholder="URL"
              v-model="url"
            />
            <p class="form-input-hint" v-if="url_error">Error format url</p>
          </div>
        </div>
        <div class="findrows-form__input">
          <div :class="'input-group' + (str_error ? ' has-error': '')">
            <input 
              class="form-input" 
              type="text" 
              :placeholder="alg_show ? 'Hash string' : 'Search string'"
              v-model="str"
            />
            <button class="btn btn-primary input-group-btn">Search</button>
            <p class="form-input-hint" v-if="str_error">Enter str find</p>
          </div>
        </div>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" v-model="remote">
            <i class="form-icon"></i> Remote
          </label>
        </div>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" v-model="alg_show">
            <i class="form-icon"></i> Hash
          </label>
        </div>
        <div class="findrows-form__select" v-if="alg_show">
          <div class="form-group">
            <label class="form-label" for="input-example-1">Algorithm</label>
            <select class="form-select" v-model="alg">
              <option v-for="a in algos" :value="a">{{a}}</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <div class="loading loading-lg" v-if="load"></div>
    <div class="findrows-list">
      <div class="findrows-list-item" v-for="row,i in findrows">
        <code>Line: {{row.number_row}}</code> 
        <code  v-if="row.info_row" v-html="InsertStr(row.str_row, row.info_row)"></code>
        <code  v-if="!row.info_row">{{row.str_row}}(<b>{{row.hash_str}}</b>)</code>
        <div class="findrows-list-item-positions" v-if="row.info_row">
          Positions: <span class="label label-primary" v-for="p in row.info_row">{{parseInt(p[1]) + 1}}</span>
        </div>
        <div class="divider" v-if="i != findrows.length - 1"></div>
      </div>
    </div>
    <div class="text-left" v-if="error">{{error}}</div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { GET_FILES, GET_ROWS, GET_ROWS_REMOTE } from '../store/actions.type'

  export default {
    name: 'FindRows',
    data() {
      return {
        file: '',
        str: '',
        url: '',
        url_error: false,
        files: [],
        load: false,
        file_error: false,
        str_error: false,
        error: '',
        findrows: [],
        remote: false,
        load_s: true,
        alg: 'md5',
        algos: ['md5', 'sh1', 'sha224', 'sha256', 'sha384', 'sha512', 'crc32'],
        alg_show: false
      }
    },
    computed: {
      ...mapGetters([
        'getFiles',
        'getRows',
        'getError'
      ])
    },
    watch: {
      getFiles(val) {
        this.files = val
        this.load_s = false
      },
      getRows(val) {
        this.findrows = val
        this.load = false
      },
      getError(val) {
        this.error = val
        this.load = false
      }
    },
    mounted() {   
      this.$store.dispatch(GET_FILES)
    },
    methods: {
      Search (file, str) {
        this.findrows = []
        this.error = ''
        this.str_error = false
        if(this.str == '') {
          this.str_error = true
        }
        if(!this.remote) {
          
          this.file_error = false
          if(this.file == '') {
            this.file_error = true
          }
          if(!this.file_error && !this.str_error) {
            this.load = true
            var args = {
              file: this.file, 
              str: this.str, 
              hash: this.alg_show ? this.alg : ''
            }
            this.$store.dispatch(GET_ROWS, args)
          }
        } else {
          this.url_error = false;
          if(!this.validUrl(this.url)) {
            this.url_error = true
          }
          if(!this.url_error && !this.str_error) {
            this.load = true
            var args = {
              url: this.url, 
              str: this.str, 
              hash: this.alg_show ? this.alg : ''
            }
            this.$store.dispatch(GET_ROWS_REMOTE, args)
          }
        }
      },
      InsertStr(str, elems) {
        return str.split(elems[0][0]).join('<b>' + elems[0][0] + '</b>');
      },
      validUrl(str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>
