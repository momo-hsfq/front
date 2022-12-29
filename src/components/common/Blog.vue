<template >
<el-col :span="24">
    <!-- <el-form-item label="内容" :label-width="formLabelWidth">
      <editor @contentData="change(arguments,userDefined)" ref="son"></editor> -->
      <!-- <div>
<el-card style="height: 400px;">
<quill-editor v-model="form.content" ref="myQuillEditor" style="height: 200px;" :options="editorOption">
</quill-editor>
</el-card>
</div> -->
    <!-- </el-form-item> -->
  </el-col>
  <el-form :model="form" >
        
        <el-form-item >
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  style="width: 200px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item label="主题" :label-width="formLabelWidth"  style="display:flex;justify-content:space-between">
                <el-input
                  v-model="form.title"
                  autocomplete="off"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="内容" :label-width="formLabelWidth">
              <editor @contentData="change(arguments,userDefined)" ref="son"></editor>
              <!-- <div>
      <el-card style="height: 400px;">
        <quill-editor v-model="form.content" ref="myQuillEditor" style="height: 200px;" :options="editorOption">
        </quill-editor>
      </el-card>
    </div> -->
            </el-form-item>
          </el-col>
          
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          :style="{ display: this.visible1 }"
          >提交</el-button
        >
        <el-button
          type="primary"
          @click="editOk"
          :style="{ display: this.visible2 }"
          >修改</el-button
        >
      </div>
  
  </template>
<script>
import editor from '../common/editor.vue'
export default {
  components: {
    editor
  },
  computed: {
      widthStyle: function () {
        // console.log(document.body.clientWidth)
        var result = ''
        var screenWidth = document.body.clientWidth
        if (screenWidth <= 1280) {
          result = '100%'
        } else if (screenWidth > 1280 && screenWidth <= 1440) {
          result = '90%'
        } else {
          result = '80%'
        }
        return {
          width: result
        }
      }
    },
    data: function () {
    return {
      screenWidth: document.body.clientWidth,
      userDefined: '',
      enclosureIDs: [],
        loadSelectData: (date = this.date) => {
        return this.$http
          .get(api.NewsType, {
            params: { 'select': true }
          })
          .then(res => {
            // this.SelectOptions = res.result.data
            // var result = []currentPage
            // res.result.data.forEach((item) => {
            //     result.push({ 'id': item.tid, 'name': item.news_type })
            // }
            // )
            // console.log(result)
            this.SelectOptions = res.result.data
          })
      },
      bg: {},
      plan: {},
      content: {},
      contentHtml: '',
      SelectOptions: [],
      select_value: '',
      value: '<h1>123</h1>',
      title: '发布消息',
      isAble: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        SelectOptions: []
      },
      quill: null
    }
  },
  methods: {
    change (data) {
      this.contentHtml = data[0]
      this.enclosureIDs = data[1]
    },
    onSubmit () {
        this.isAble = true
        // console.log(this.$refs.childMethod.getContentData())
        this.$http
          .post(api.NewsDetail, {
            params: { type_id: this.select_value, title: this.title, content: this.contentHtml, enclosure_ids: this.enclosureIDs }
          })
          .then(res => {
            this.isAble = false
            this.$refs.son.fileList = []
            this.$refs.son.enclosureIDs = []
            this.SelectOptions = res.result.data
            this.$router.push({
                  path: '/news/'
              })
          })
    },
    selectChanged (value) {}
  },
  created: function () {},
  mounted () {
    this.loadSelectData()
  },
  activated () {
    this.title = ''
    this.content = {}
    this.contentHtml = ''
    this.loadSelectData()
  }
}
</script>
<style>
.ql-editor {
  min-height:400px; height:auto!important; height:400px;
}
</style>

