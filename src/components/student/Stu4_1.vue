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
              <el-table-column type="index" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleMore(scope.$index, scope.row)"
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
          </template>
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
    <div>
    <mavon-editor v-model="content" ref="md"    style="height:300px;width: 700px;" />
            </div>
       <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addBlogData" :style="{display: this.visible1}">提交</el-button>
    <el-button type="primary" @click="editBlog" :style="{display: this.visible2}">修改</el-button>
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
      width: 600px;
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
  import upload from '../common/Upload.vue'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // import Blog from '../common/Blog.vue'
  
  import { error } from 'console'
  export default {
    components:{
      'v-upload':upload,
      // 'v-Blog':Blog
      mavonEditor
    
      
   
    },
    data() {
      
      return {
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
      editorOption: {},
      content: '',
        html: ''
        
      }
    },
    
    

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

addStuBtn() {
  this.content='',
        this.html= '',
      
 
      this.dialogFormVisible = true;
      this.visible2 = 'none';
      this.visible1 = 'inline';
      this.isDisabled = false;
    },


    addBlogData (markdown, render) {
      this.html = render
        console.log(this.content)
        console.log(this.html)

        this.$axios
        .post('/stuBasicInfo/add', {
          contencontent,html})
        .then((result) => {
          console.log(result);
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '添加成功!',
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
      
      },
      handleEdit(index, row) {
      
      this.visible1 = 'none';
      this.visible2 = 'inline';
      this.isDisabled = true;
      this.dialogFormVisible = true;
    },
      editBlog (value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render
        console.log("markdown内容: " + markdown);
        console.log("html内容:" + html);
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
    created:function(){
  
      console.log('enter3')
          this.getDataForm()
        }
  }
  </script>
  
  