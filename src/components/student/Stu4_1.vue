<template>
  <div class="home" style="width: 1100px">
  
  <!--gutter表示单个el-card之间的间距  -->
  
  <el-row :gutter="1">
  
    <!-- span 默认el-row为24 用span去平分 -->
  
    <el-col :span="10">
  
      <el-card class="box-card1">
        <v-upload class="upload"></v-upload>
        <div class="name-role">
            <span class="sender"><b>STUDENT - {{student.name}}</b></span>  
          </div>
          <div class="registe-info">
            <span class="registe-info">
              <b>NUMBER - {{student.studentNo}}</b>
            </span>
          </div>
        <el-divider></el-divider>
        <div class="personal-relation" >
          <div class="relation-item" >电话号码:  <div style="float: right; padding-right:30px;">{{student.phoneNum}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >出生日期:  <div style="float: right; padding-right:30px;">{{student.birthDate}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >身份证号:  <div style="float: right; padding-right:30px;">{{student.identityNum}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >学院:  <div style="float: right; padding-right:30px;">{{student.department}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >年级:  <div style="float: right; padding-right:30px;">{{student.grade}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >班级:  <div style="float: right; padding-right:30px;">{{student.class}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >政治面貌:  <div style="float: right; padding-right:30px;">{{student.politicalAppearance}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >毕业院校:  <div style="float: right; padding-right:30px;">{{student.graduateSchool}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >状态:  <div style="float: right; padding-right:30px;">{{student.status}}</div></div>      
      </div>

  
      </el-card>
      
    </el-col>
  
    <el-col :span="10">
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
                <span style="float: left"><b>个人画像</b></span>
              
                
              </div>
        <v-portrait class="portrait"></v-portrait>
        
      </el-card>
  
      <el-card class="box-card3">
        <div slot="header" class="clearfix">
                <span style="float: left"><b>个人博客</b></span>
                  
                  <el-button
                    type="primary"
                    icon="el-icon-user"
                    style="float:right"
                    size="mini"
                    @click="addStuBtn"
                    round
                  >
                  </el-button>
              </div>
              <div style="background-color: #eff1f2; padding: 5px; border-radius: 2px">
      <el-table
         
      >
              <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column type="createTime" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="dialogShowVisible = true"
              >详情</el-button
            >
            
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              plain
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      style="text-align: center"
    ></el-pagination>
    
    <el-dialog
      title="个人博客"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
    <el-form  :model="markdownForm" :rules="rules"   label-width="80px" >
    
  
      <el-form-item label="标 题" prop="title" >
        <el-input v-model="markdownForm.title" style="width: 80%" ></el-input>
      </el-form-item>
    
  
      <el-form-item label="日期" prop="" >
              <el-date-picker
                v-model="markdownForm.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 200px"
              >
              </el-date-picker>
            </el-form-item>
            
    </el-form>
    <mavon-editor ref="md"  v-model="markdownForm.content"  :codeStyle="markdown.codeStyle" :toolbars="markdown.toolbars"   @change="change" />
    <br>
    <el-row>
      <el-col :span="2">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </el-col>
      <el-col :span="2" :offset="20">
        <el-button type="primary" style="float: right;" @click="save">保 存</el-button>
      </el-col>
 
    </el-row>
  
  </el-dialog>  
  <el-dialog
      title="个人博客"
      :visible.sync="dialogShowVisible"
      :close-on-click-modal="false"
      width="50%"
      
    >
    <div id="canvas" style="border:1px solid #000000;

                            width: 600px;height: 200px;">
    <div v-html="html" id="app">
    </div>
  </div>
      
    </el-dialog>
  
      </el-card>
  
    </el-col>
  
  
  </el-row>
  
  </div>
  </template>
  
  <style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  
  .box-card1 {
      width: 380px;
      height: 1000px;
      border-radius: 30px;
    }
    
  
    .box-card2 {
      width: 400px;
      height: 480px;
      border-radius: 30px;
    }
    .box-card3 {
      width: 600px;
      height: 500px;
      border-radius: 30px;
    }
    .el-card{
      margin-bottom:20px; 
  
    }
    .upload{
      text-align:center;
  
    }
  
    .name-role {
      font-size: 16px;
      padding: 5px;
     text-align:center;
    }
     .sender{
        text-align:center;
      }
  .registe-info{
    text-align: center;
    padding-top:10px;
  }
  .personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
      width: 100%
  }
  
  .relation-item {
    padding: 12px;
  }
  
  </style>
  
  
  
  <script>

  import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import portrait from '../common/Portrait.vue'
  import upload from '../common/Upload.vue'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import marked from 'marked'
  import hljs from 'highlight.js'//引用
import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
  // import Blog from '../common/Blog.vue'
  import axios from 'axios'
  import qs from 'qs'
  // const area_axios = axios.create({
  //   headers: {'Content-Type': 'application/json;charset=utf-8',},// 设置传输内容的类型和编码
  //   withCredentials: true,// 指定某个请求应该发送凭据
  // })
  // const file_axios = axios.create({
  //   headers: {'Content-Type': 'multipart/form-data',},// 设置传输内容的类型和编码
  //   withCredentials: true,// 指定某个请求应该发送凭据
  // })
  // const area_form_axios = axios.create({
  //   headers: {'Content-Type': 'application/x-www-form-urlencoded',},// 设置传输内容的类型和编码
  //   withCredentials: true,// 指定某个请求应该发送凭据
  // })
  
  import { error } from 'console'
  export default {
    components:{
      'v-upload':upload,
      // 'v-Blog':Blog
      'v-portrait':portrait,
      mavonEditor
    
      
   
    },
    computed: {
	// compiledMarkdown : function () {
	// 	return marked ( this.input)
	// }
},

    // mounted:function (){
    //     getArticle()
    // },
    data() {
      
      
      return {
        markdown:{
        codeStyle:'atom-one-dark',
        toolbars:{
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: false, // 预览
        }
      },
        // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        // userinfo: userinfo
        student:{
          studentNo: '',
          name: '',
          gender: '',
          graduateSchool: '',
          birthDate: '',
          identityNum: '',
          politicalAppearance: '',
          phoneNum: '',
          department: '',
          grade:'',
          class: '',
          status: '',},
          pageSize: 17,
      currentPage: 1,
      totalCount: 1,
          
          tableData: [],
          dialogFormVisible: false,
          visible2: 'none',
      visible1: 'inline',
      isDisabled: false,
      formLabelWidth: '80px',
      editorOption: {},
      
      markdownForm : {
        
        title:"",
        date:"",
        content:'',
        html:'',
        
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 80, message: '长度在1到80个字符', trigger: 'blur' }
        ]
      },
    }
  }, 
      
  //   },
  //   created(){
  //   this.getArticle() 
  // },
  // mounted() {
  //   this.timer = setInterval(this.intervalSave, 2*60*1000);
  // },
  // beforeDestroy() {
  //   clearInterval(this.timer);
  // },
    
    

    methods: {

      getDataForm() {
  
        console.log('enter2')
        
        this.$axios
        .post('/stuBasicInfo/getInfo',{}
          
      ).then((result) => {
  
        if (result.data.code === 1) {
          console.log(result);
          this.student = result.data.datas;
        } else {
            return false;
        }
      }).catch((error) => {
        console.log("enter4");
            alert(error);
          });
  
  
      },
      $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      //将下面上传接口替换为你自己的服务器接口
      axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    },


  //     getArticle(){  //获取文章内容
  //    let id=this.$route.query.a
  //    if(id==null){
  //      this.markdownForm.contentMarkdown=''
  //    }else{
  //      getMarkdownArticle(id).then(r => {
  //        this.markdownForm.contentMarkdown=r.data.contentMarkdown==null?'':r.data.contentMarkdown
  //        this.markdownForm.articleId=r.data.articleId
  //        this.markdownForm.title=r.data.title
  //        this.markdownForm.type=r.data.type
  //      }).catch(e => {
  //        console.log(e)
  //      })
  //    }
  //  },
  //  save(){  //保存文章内容
  //    saveMarkdownArticle(this.markdownForm).then(r => {
  //      this.$message.success("保存成功")
  //      this.markdownForm.articleId=r.data.articleId
  //      this.lastSaveTime=new Date()
  //    }).catch(e => {
  //      console.log(e)
  //    })
  //  },
  //  intervalSave(){ //自动保存
  //     let now = new Date()
  //     if(now-this.lastSaveTime>=2*60*1000){
  //       saveMarkdownArticle(this.markdownForm).then(r => {
  //         this.$message.success("自动保存成功")
  //         this.lastSaveTime=new Date()
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //     }
  //  },
  //  imgAdd(pos, file){ //添加图片，pos为位置
  //     let markdownImg = {},$vm=this.$refs.md
  //     markdownImg.base64Data=file.miniurl  //获取图片base64内容
  //     markdownImg.type=file.type
  //     uploadImg(markdownImg).then(r => {
  //       console.log(r)
  //       $vm.$img2Url(pos,process.env.VUE_APP_BASE_API+'/img/'+r.data) 
  //     }).catch(e => {
  //       console.log(e)
  //     })
  //   },
  //   imgDel(pos,url){ //删除图片，并不是修改就会触发，仅支持工具栏操作
  //     console.log(pos)
  //     console.log(url)
  //   },


addStuBtn() {
  this.content='',
        this.html= '',
      
 
      this.dialogFormVisible = true;
      this.visible2 = 'none';
      this.visible1 = 'inline';
      this.isDisabled = false;
    },
    // handleMore(index, row){
    //   this.visible1 = 'none';
    //   this.visible2 = 'none';
    //   this.isDisabled = true;
    //   this.dialogFormVisible = true;
    // },

    
    //   handleEdit(index, row) {
      
    //   this.visible1 = 'none';
    //   this.visible2 = 'inline';
    //   this.isDisabled = true;
    //   this.dialogFormVisible = true;
    // },
    // handleDelete(index, row) {
    //   this.$confirm('确定删除' + row.name + '吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   })
    //   // console.log(row.studentNo)
    //     .then(() => {
    //       this.$axios
    //         .post('/stuBasicInfo/delete', {
    //           studentNo: row.studentNo,
    //         })
    //         .then((result) => {
    //           console.log(result);
    //           if (result.data.code === 1) {
    //             this.$message({
    //               type: 'success',
    //               message: '删除成功!',
    //             });
    //             this.getTableData();
    //           } else {
    //             this.$message({
    //               type: 'error',
    //               message: result.data.msg,
    //             });
    //           }
    //         })
    //         .catch((error) => {
    //           alert(error);
    //         });
    //     })
    //     .catch(() => {});
    // },


    // handleCurrentChange(val) {
    //   this.currentPage = val;
    // },
    // $imgAdd(pos, $file) {
    //   var formdata = new FormData();
    //   formdata.append("file", $file);
    //   //将下面上传接口替换为你自己的服务器接口
    //   axios({
    //     url: "/common/upload",
    //     method: "post",
    //     data: formdata,
    //     headers: { "Content-Type": "multipart/form-data" }
    //   }).then(url => {
    //     this.$refs.md.$img2Url(pos, url);
    //   });
    // },
    change(value, render) {
      // render 为 markdown 解析后的结果
      console.log(render);

      this.html = render;

    },
    save() {
      this.$axios
        .post('/stuBasicInfo/add', {})
        .then((result) => {
          console.log(result);
          console.log(this.content);
          console.log(this.html);
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '提交成功!',
            });
            this.getTableData();
          } else {
            this.$message({
              type: 'error',
              message: result.data.msg,
            });
          }
          this.dialogFormVisible = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
    
    //   editBlog (value, render) {
    //     // render 为 markdown 解析后的结果[html]
    //     this.html = render
    //     console.log("markdown内容: " + markdown);
    //     console.log("html内容:" + html);
    //   },
    //  // 获取文章
		// getArticle(){
		// 	area_form_axios.get('/api/get',{
	  //           params:{id: 12 }
	  //         },)
	  //       .then(response => {
	  //         console.log(this.sqlData)
	  //         this.sqlData = response.data
	  //       })
	  //       .catch(err => {
	  //         alert("请求失败")
	  //       })
		// },
    //   // 保存文章
    //   saveArticle(){
    //     var htmlCode = this.$refs.md.d_render;
    //     var markdownCode = this.$refs.md.d_value;
    //     if(htmlCode.length == 0 || markdownCode.length == 0){
    //       alert("请填写")
    //       return;
    //     }
    //     area_axios({
    //       url: '/api/add',
    //       method: 'post',
    //       data: JSON.stringify({'markdown':markdownCode,'html':htmlCode}),
    //     }).then((response) => {
    //       if(response.data > 0){
    //         alert("成功")
    //       }else {
    //         alert("失败")
    //       }
    //     })
    //   },
    //   // 添加图片
    //   imgAdd(pos, file){
    //     console.log("pos:"+pos)
    //     // 第一步.将图片上传到服务器.
    //     var formdata = new FormData();
    //     formdata.append('pic', file);
    //     file_axios({
    //       url: '/api/img_upload',
    //       method: 'post',
    //       data: formdata,
    //     }).then((response) => {
    //       // 第二步.将返回的url替换到文本原位置
    //       var url = response.data;
    //       //通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
    //       //通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`
    //       this.$refs.md.$img2Url(pos, url);
    //     })
    //   },
    //   // 删除图片
    //   imgDel(pos){
    //     console.log("imgDel pos:"+pos)
    //   }, 
    //   // 多张图片
    //   mulUploadimg(){
    //     // 第一步.将图片上传到服务器.
    //     var formdata = new FormData();
    //     for(var _img in this.img_file){
    //       debugger
    //       // 后台需要图片的key一致
    //       formdata.append('pics', this.img_file[_img]);
    //     }
    //     file_axios({
    //       url: '/api/mul_img_upload',
    //       method: 'post',
    //       data: formdata,
    //     }).then((res) => {
    //       /**
    //        * 例如：返回数据为 res = [[pos, url], [pos, url]...]
    //        * pos 为原图片标志（0）
    //        * url 为上传后图片的url地址
    //        */
    //         // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    //       var  idx_url = res.data;
    //       idx_url.forEach(item => {
    //         //通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
    //         //通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`
    //         this.$refs.md.$img2Url(item[0], item[1]);
    //       });
    //     })
    //   },
    //   // 多张图片
    //   imgDelMul(pos){
    //     console.log("imgDel pos:"+pos)
    //     delete this.img_file[pos];
    //   },







    },
   
    // addBlogData() {
    //   this.$axios
    //     .post('/', this.form)
    //     .then((result) => {
    //       console.log(result);
    //       if (result.data.code === 1) {
    //         //返回第一页数据，和
    //         this.$message({
    //           type: 'success',
    //           message: '修改成功!',
    //         });
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: result.data.msg,
    //         });
    //       }
    //       this.dialogFormVisible = false;
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    // },
    // handleEdit(index) {
    //   this.form.date = this.date;
    //   this.form.title = this.title;
    //   this.form.content = this.content;
    //   this.visible1 = 'none';
    //   this.visible2 = 'inline';
    //   this.isDisabled = true;
    //   this.dialogFormVisible = true;
    // },
    // editOk() {
    //   this.$axios
    //     .post('', this.form)
    //     .then((result) => {
    //       if (result.data.code === 1) {
    //         //返回第一页数据，和
    //         this.$message({
    //           type: 'success',
    //           message: '修改成功!',
    //         });
    //         this.getTableData();
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: result.data.msg,
    //         });
    //       }
    //       this.dialogFormVisible = false;
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    // },


    //博客部分
   
      
      // load() {
      //   const username = this.user.username
      //   if (!username) {
      //     this.$message.error("当前无法获取用户信息！")
      //     return
      //   }
      //   this.request.get("/user/username/" + username).then(res => {
      //     this.dataForm = res.data
      //   })
      // },
      // save() {
      //   this.request.post("/user", this.form).then(res => {
      //     if (res.code === '200') {
      //       this.$message.success("保存成功")
      //       this.dialogFormVisible = false
      //       this.load()
  
      //       this.$emit('refreshUser')
      //     } else {
      //       this.$message.error("保存失败")
      //     }
      //   })
      // },
    //   handleAvatarSuccess(res) {
    //     // res就是文件的路径
    //     this.form.avatarUrl = res
    //   }
    // },
    
  }
  </script>
  
  