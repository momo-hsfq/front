<template>
    <keep-alive>
      <div>
        <div class="editor"></div>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="httpRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="50"
          :on-exceed="handleExceed"
          :ref="upload"
          :file-list="fileList">
          <el-button
            size="small"
            type="primary"
            @click="uploadBtn"
            class="my-upload"
            v-show="false"
            style="height:0px">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" style="margin-top:0px">已选择附件：</div>
        </el-upload>
      </div>
    </keep-alive>
  </template>
  
  <script>
  // import api from '@/api/index'
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  const titleConfig = {
    'ql-bold': '加粗',
    'ql-color': '颜色',
    'ql-font': '字体',
    'ql-code': '插入代码',
    'ql-italic': '斜体',
    'ql-link': '添加链接',
    'ql-background': '颜色',
    'ql-size': '字体大小',
    'ql-strike': '删除线',
    'ql-script': '上标/下标',
    'ql-underline': '下划线',
    'ql-blockquote': '引用',
    'ql-header': '标题',
    'ql-indent': '缩进',
    'ql-list': '列表',
    'ql-align': '文本对齐',
    'ql-direction': '文本方向',
    'ql-code-block': '代码块',
    'ql-formula': '公式',
    'ql-image': '图片',
    'ql-video': '视频',
    'ql-clean': '清除字体样式',
    'ql-upload': '文件',
    'ql-table': '插入表格',
    'ql-table-insert-row': '插入行',
    'ql-table-insert-column': '插入列',
    'ql-table-delete-row': '删除行',
    'ql-table-delete-column': '删除列'
  }
  export default {
    name: 'Editor',
    props: {
    },
    data () {
      return {
        upload: '',
        enclosureIDs: [],
        fileReader: null,
        fileList: [],
        content2: '',
        loadData: (date = this.date) => {
              return this.$http
              .get(api.NewsDetail, {
                  params: { nid: this.$route.query.nid }
              })
              .then(res => {
                  var resData = res.result.data[0]
                  if (resData) {
                  this.content2 = resData.content
                  this.quill.root.innerHTML = this.content2
                  } else {
                  this.content2 = ''
                  }
              })
          },
        quill: null,
        uploadAPI: api.Enclosure,
        options: {
          theme: 'snow',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: 1 }, { header: 2 }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],
                [
                  { table: 'TD' },
                  { 'table-insert-row': 'TIR' },
                  { 'table-insert-column': 'TIC' },
                  { 'table-delete-row': 'TDR' },
                  { 'table-delete-column': 'TDC' }
                ],
                ['sourceEditor']
              ],
              handlers: {
                table: function (val) {
                  this.quill.getModule('table').insertTable(2, 3)
                },
                'table-insert-row': function () {
                  this.quill.getModule('table').insertRowBelow()
                },
                'table-insert-column': function () {
                  this.quill.getModule('table').insertColumnRight()
                },
                'table-delete-row': function () {
                  this.quill.getModule('table').deleteRow()
                },
                'table-delete-column': function () {
                  this.quill.getModule('table').deleteColumn()
                },
                sourceEditor: function () { // 添加工具方法
                    document.getElementsByClassName('my-upload')[0].click()
                }
  
              }
            },
            table: true
          },
          placeholder: ''
        }
      }
    },
    methods: {
  
      httpRequest (options) {
            var file = options.file
            var filename = file.name
            const reader = new FileReader()
            reader.readAsDataURL(file)
            const that = this
            reader.onload = function () {
              var base64Str = this.result
              if (base64Str === 'data:') {
                // 为空txt时下载的时候会显示网络错误，这里进行处理转换为有一个空格的txt
                 base64Str = 'data:text/plain;base64,IA=='
              }
              that.$http
              .post(api.Enclosure, {
                  params: { base64Str: base64Str, name: filename, nid: that.$route.query.nid }
                })
              .then(res => {
                that.enclosureIDs.push({ 'en_id': res.enclosure_id, 'name': filename })
                that.$emit('contentData', that.quill.root.innerHTML, that.enclosureIDs)
              })
            }
      },
      uploadBtn () {
      },
      handleRemove (file, fileList) {
          var deleteId = 0
          if (file.id) {
            for (var i = 0; i < this.fileList.length; i++) {
              if (this.fileList[i].name === file.name) {
                this.fileList.splice(i, 1)
                  deleteId = file.id
                  break
              }
            }
          } else if (file.uid) {
            for (var j = 0; j < this.enclosureIDs.length; j++) {
              if (this.enclosureIDs[j].name === file.name) {
                  deleteId = this.enclosureIDs[j]['en_id']
                  this.enclosureIDs.splice(j, 1)
                  break
              }
            }
          }
          // for (var i = this.fileList.length - 1; i > 0; i--) {
          //   console.log(this.fileList[i])
          //   }
          // this.$emit('contentData', this.quill.root.innerHTML, this.enclosureIDs)
          // // 请求删除附件接口
          this.$http
            .delete(api.Enclosure, {
              params: { eid: deleteId }
            })
            .then(res => {
              this.$emit('contentData', this.quill.root.innerHTML, this.enclosureIDs)
              this.$message({
              type: 'success',
              message: '删除成功!'
            })
            })
        },
      handlePreview (file) {
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`)
      },
      addQuillTitle () {
        const oToolBar = document.querySelector('.ql-toolbar')
        const aButton = oToolBar.querySelectorAll('button')
        const aSelect = oToolBar.querySelectorAll('select')
        aButton.forEach(function (item) {
          if (item.className === 'ql-script') {
            item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
          } else if (item.className === 'ql-indent') {
            item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
          } else {
            item.title = titleConfig[item.classList[0]]
          }
        })
        aSelect.forEach(function (item) {
          item.parentNode.title = titleConfig[item.classList[0]]
        })
      },
      getContentData () {
        return this.quill.getContents()
      }
    },
    mounted () {
      this.fileReader = new FileReader()
      const dom = this.$el.querySelector('.editor')
      this.quill = new Quill(dom, this.options)
      this.myEl = this.$el.querySelector('.ql-sourceEditor')
      // this.quill.setContents(this.value)
      this.quill.on('text-change', () => {
      //   console.log(this.quill.getContents())
      //   this.$emit('contentData', this.quill.getContents())
      //   console.log(this.quill.root.innerHTML)
        this.$emit('contentData', this.quill.root.innerHTML, this.enclosureIDs)
      })
      this.$el.querySelector(
        '.ql-table-insert-row'
      ).innerHTML = `<svg t="1591862376726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6306" width="18" height="200"><path d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z" p-id="6307"></path></svg>`
      this.$el.querySelector(
        '.ql-table-insert-column'
      ).innerHTML = `<svg t="1591862238963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6509" width="18" height="200"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="6510"></path></svg>`
      this.$el.querySelector(
        '.ql-table-delete-row'
      ).innerHTML = `<svg t="1591862253524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6632" width="18" height="200"><path d="M500.8 461.909333L267.306667 695.296l-45.226667-45.269333 278.741333-278.613334L779.306667 650.026667l-45.248 45.226666z" p-id="6633"></path></svg>`
      this.$el.querySelector(
        '.ql-table-delete-column'
      ).innerHTML = `<svg t="1591862261059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6755" width="18" height="200"><path d="M641.28 278.613333l-45.226667-45.226666-278.634666 278.762666 278.613333 278.485334 45.248-45.269334-233.365333-233.237333z" p-id="6756"></path></svg>`
      this.addQuillTitle()
      this.$el.querySelector(
        '.ql-sourceEditor'
      ).innerHTML = `<svg t="1592278063482" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6358" width="18" height="200"><path d="M704 341.333333h64a64 64 0 0 1 64 64v362.666667a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h64v64h-64v362.666667h512V405.333333h-64v-64zM517.653333 124.629333l150.826667 150.826667-45.226667 45.269333-74.026666-74.005333v304.768h-64V247.616l-73.173334 73.130667-45.248-45.248 150.826667-150.848z" p-id="6359"></path></svg>`
    },
    activated () {
      if (this.$route.query.nid) {
        this.loadData()
      } else {
        this.quill.root.innerHTML = ''
      }
    }
  }
  </script>

  
  <style>
  .el-upload-list__item {
        transition: none !important;
      }
  </style>