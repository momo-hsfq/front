<!-- <template>
<div style="width:1150px">
  <el-table
    :data="infoTableData"
    border
    style="width: 100%">
    <el-table-column label="个人信息">
    <el-table-row prop="id" label="学号" width="150">
    </el-table-row>
    <el-table-row prop="name" label="姓名" width="150">
    </el-table-row>
    <el-table-row prop="sex" label="性别" width="100">
    </el-table-row>
    <el-table-row prop="birth" label="出生日期" width="150">
    </el-table-row>
    <el-table-row prop="political" label="政治面貌" width="150">
    </el-table-row>
    <el-table-row prop="classAndGrade" label="行政班级" width="150">
    </el-table-row>
    <el-table-row prop="status" label="学生状态" width="100">
    </el-table-row>
    <el-table-row prop="all_credit" label="总学分" width="100">
    </el-table-row>
    <el-table-row prop="avg_grade" label="平均成绩" width="100">
    </el-table-row>
    </el-table-column>
  </el-table>
  </div>
</template> -->
<template>
<div class="home">

<!--gutter表示单个el-card之间的间距  -->

<el-row :gutter="1">

  <!-- span 默认el-row为24 用span去平分 -->

  <el-col :span="12">

    <el-card class="box-card1">
      <v-upload class="upload"></v-upload>
      <div class="name-role">
          <span class="sender">STUDENT - {{student.name}}</span>  
        </div>
        <div class="registe-info">
          <span class="registe-info">
            NUMBER - {{student.studentNo}}
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
      <div class="relation-item" >班级:  <div style="float: right; padding-right:30px;">{{student.stuClass}}</div></div>      
    </div>
    <div class="personal-relation" >
        <div class="relation-item" >政治面貌:  <div style="float: right; padding-right:30px;">{{student.politicalAppearence}}</div></div>
    </div>
    <div class="personal-relation">
      <div class="relation-item" >毕业院校:  <div style="float: right; padding-right:30px;">{{student.graduateSchool}}</div></div> 
    </div>
       <div class="personal-relation">
      <div class="relation-item" >状态:  <div style="float: right; padding-right:30px;">{{student.status}}</div></div>      
    </div>

    </el-card>
    
  </el-col>

  <el-col :span="12">
    <el-card class="box-card2">
      
    </el-card>

    <el-card class="box-card3">
      <!-- <div>
    <el-card style="height: 610px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 200px;" :options="editorOption">
      </quill-editor>
    </el-card>
  </div> -->
  

    </el-card>

  </el-col>


</el-row>

</div>
</template>

<style scoped>
.box-card1 {
    width: 450px;
    height: 1000px;
    border-radius: 30px;
  }
  

  .box-card2 {
    width: 700px;
    height: 480px;
    border-radius: 30px;
  }
  .box-card3 {
    width: 700px;
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
        politicalAppearence: '',
        phoneNum: '',
        department: '',
        grade:'',
        stuClass: '',
        status: '',}
      
    }
  },
  created() {
    // this.load()
    this.getDataForm()
  },
  methods: {
    getDataForm() {
      return axios.post(
        '/stuBasicInfo/getInfo' + url,
        // url,
        {
            data: this.student
        },
        {
            headers: {
                Authorization: 'Bearer ' + store.state.jwtToken
            }
        }
    ).then(res => {
        if (res.status == 500) {

            ElMessage({
                type: 'warnning',
                message: '后端报错'
            });
            return;
        }
        if (res.status == 404) {
            ElMessage({
                type: 'warnning',
                message: '后端方法不存在'
            });
            return;
        }
        return res.data
    }).catch(() => {
        return;
    })


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
        this.getDataForm()
      }
}
</script>


