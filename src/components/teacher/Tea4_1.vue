<!-- <template>
<div style="width:1150px">
  <el-table
    :data="infoTableData"
    border
    style="width: 100%">
    <el-table-column label="个人信息">
    <el-table-column
      prop="id"
      label="工号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="100">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="联系电话"
      width="150">
    </el-table-column>
    <el-table-column
      prop="pol"
      label="政治面貌"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="职称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="dpt"
      label="系别"
      width="150">
    </el-table-column>
    <el-table-column
      prop="degree"
      label="学历"
      width="100">
    </el-table-column>
    <el-table-column
      prop="workTime"
      label="工作时间"
      width="150">
    </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        infoTableData:[]
      }
    },
    methods:{
      getInfoTable(){
        this.$axios
        .post('/teacher/getInfoTable', {})
        .then((result)=> {
            if (result.data.code === 1) {
                this.infoTableData = result.data.datas
            }
        })
        .catch((error)=> {
            alert(error)
        })
      }
    },
    created(){
      this.getInfoTable()
    }
  }
</script> -->


<!-- <template>
  <v-teacher></v-teacher>
</template>

<script>
import teacher from '../common/Teacher.vue'
export default {
  components:{
    'v-teacher':teacher
  }
}
</script> -->

<template>
  <div class="home">
  
  <!--gutter表示单个el-card之间的间距  -->
  
  <el-row :gutter="1">
  
    <!-- span 默认el-row为24 用span去平分 -->
  
    <el-col :span="12">
  
      <el-card class="box-card1">
        <v-upload class="upload"></v-upload>
        <div class="name-role">
            <span class="sender">TEACHER - {{dataForm.name}}</span>  
          </div>
          <div class="registe-info">
            <span class="registe-info">
              NUMBER - {{dataForm.teacherNo}}
            </span>
          </div>
        <el-divider></el-divider>
        <div class="personal-relation" >
          <div class="relation-item" >电话号码:  <div style="float: right; padding-right:30px;">{{dataForm.telephone}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >出生日期:  <div style="float: right; padding-right:30px;">{{dataForm.birth}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >身份证号:  <div style="float: right; padding-right:30px;">{{dataForm.idCard}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >学历:  <div style="float: right; padding-right:30px;">{{dataForm.degree}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >政治面貌:  <div style="float: right; padding-right:30px;">{{dataForm.political}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >职称:  <div style="float: right; padding-right:30px;">{{dataForm.title}}</div></div>      
      </div>
      <div class="personal-relation" >
          <div class="relation-item" >学院:  <div style="float: right; padding-right:30px;">{{dataForm.department}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >工作时间:  <div style="float: right; padding-right:30px;">{{dataForm.workTime}}</div></div> 
      </div>
  
      </el-card>
      
    </el-col>
  
    <el-col :span="12">
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
                <span style="float: left"><b>学术资料</b></span>
               
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
              <div class="personal-relation" >
          <div class="relation-item" >研究方向:  <div style="float: right; padding-right:30px;">{{teacher.direction}}</div></div>
      </div>
      <div class="personal-relation">
        <div class="relation-item" >讲授课程:  <div style="float: right; padding-right:30px;">{{teacher.course}}</div></div> 
      </div>
         <div class="personal-relation">
        <div class="relation-item" >论文著作:  <div style="float: right; padding-right:30px;">{{teacher.book}}</div></div>      
      </div>
      <el-dialog
      title="学术资料"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="form">
        
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="研究方向" :label-width="formLabelWidth">
              <el-input
                v-model="form.direction"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      <el-form-item>
          
          <el-col :span="24">
            <el-form-item label="讲授课程" :label-width="formLabelWidth">
              <el-input
                v-model="form.course"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="论文著作" :label-width="formLabelWidth">
              <el-input
                v-model="form.book"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addStudentData"
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
    </el-dialog>
        
      </el-card>
  
      <el-card class="box-card3">
        <div>
    <el-card style="width:400px ; height: 200px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 200px;" :options="editorOption">
      </quill-editor>
    </el-card>
  </div>
  
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
      width: 400px;
      height: 1000px;
      border-radius: 30px;
    }
    
  
    .box-card2 {
      width: 450px;
      height: 280px;
      border-radius: 30px;
    }
    .box-card3 {
      width: 450px;
      height: 300px;
      border-radius: 30px;
    }
    .el-card{
      margin-bottom:20px; 
  
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

  .upload{
    text-align:center;

  }
  
  </style>
  
  
  
  <script>
  import upload from '../common/Upload.vue'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    components:{
    'v-upload':upload,
    quillEditor
  },
    data() {
      return {
        // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        // userinfo: userinfo
        dataForm:{
          teacherNo: '',
          name: '',
          birth: '',
          degree: '',
          idCard: '',
          telephone: '',
          political: '',
          workTime: '',
          department: '',
          title: '',
        },
        teacher:{
          direction:'',
          course:'',
          book:'',
        },
        
        form:{
          direction:'',
          course:'',
          book:'',
        },
        content: null,
        visible2: 'none',
      visible1: 'inline',
        dialogFormVisible: false,
        isDisabled: false,
        editorOption: {}
      }
    },
    created() {
      this.load()
    },
    methods: {
      // load() {
      //   const username = this.user.username
      //   if (!username) {
      //     this.$message.error("当前无法获取用户信息！")
      //     return
      //   }
      //   this.request.get("/user/username/" + username).then(res => {
      //     this.form = res.data
      //   })
      // },
      getDataForm() {
  
  console.log('enter2')
  
  this.$axios
  .post('/teaBasicInfo/getInfo',{}
    
).then((result) => {

  if (result.data.code === 1) {
    console.log(result);
    this.teacher = result.data.datas;
  } else {
      return false;
  }
}).catch((error) => {
  console.log("enter4");
      alert(error);
    });


},
      
      addStuBtn() {
      this.form.direction = '';
      this.form.book = '';
      this.form.course = '';
 
      this.dialogFormVisible = true;
      this.visible2 = 'none';
      this.visible1 = 'inline';
      this.isDisabled = false;
    },
    addStudyData() {
      this.$axios
        .post('/', this.form)
        .then((result) => {
          console.log(result);
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '修改成功!',
            });
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
    handleEdit(index) {
      this.form.direction = this.direction;
      this.form.course = this.course;
      this.form.book = this.book;
      this.visible1 = 'none';
      this.visible2 = 'inline';
      this.isDisabled = true;
      this.dialogFormVisible = true;
    },
    editOk() {
      this.$axios
        .post('', this.form)
        .then((result) => {
          if (result.data.code === 1) {
            //返回第一页数据，和
            this.$message({
              type: 'success',
              message: '修改成功!',
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
      handleAvatarSuccess(res) {
        // res就是文件的路径
        this.form.avatarUrl = res
      }
    },
  //   watch: {
  //   deptSelected: function () {
  //     this.$nextTick(function () {
  //       this.getDataForm();
  //     });
  //   },
  // },
  created() {
    // this.getAllClass();
    // this.gradeSelected = this.gradeOptions[2].grade;
    // this.getDptName();
    this.getDataForm();
  },
  }
  </script>
  
  
  