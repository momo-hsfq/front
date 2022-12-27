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
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    style="float:right"
                    round
                  >
                  
                  </el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-mouse"
                    style="float:right"
                    size="mini"
                    @click="addStuBtn"
                    round
                  >
                  </el-button>
              </div>
        <!-- <div>
      <el-card style="height: 400px;">
        <quill-editor v-model="content" ref="myQuillEditor" style="height: 400px;" :options="editorOption">
        </quill-editor>
      </el-card>
    </div> -->
    
  
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
  import { error } from 'console'
  export default {
    components:{
      'v-upload':upload,
      quillEditor
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
          status: '',}
        
      }
    },
    created() {
      console.log('enter1')
      this.getDataForm()
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
      handleAvatarSuccess(res) {
        // res就是文件的路径
        this.form.avatarUrl = res
      }
    },
    created:function(){
  
      console.log('enter3')
          this.getDataForm()
        }
  }
  </script>
  
  