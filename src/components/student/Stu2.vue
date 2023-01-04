<template>
<div style="width:1101px">
    <div style="margin-bottom: 10px">
        <label>学期：</label>
        <el-select v-model="termSelected" clearable @clear="load"  placeholder="请选择学期" @change="getTermSelected">
        <el-option
        v-for="item in termOptions"
        :key="item.term"
        :label="item.label"
        :value="item.label">
        </el-option>
        </el-select>
    </div>
    <el-table
    :data="gradeTableData"
    border
    stripe
    style="width: 100%;"
    :row-style="{height:0+'px'}"
    :cell-style="{padding:5+'px'}">
    <el-table-column label="你的学期成绩">
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="courseNo"
      label="课程编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="courseType"
      label="课程类型"
      width="200">
    </el-table-column>
    <el-table-column
      prop="credit"
      label="学分"
      width="100">
    </el-table-column>
    <el-table-column
      prop="overallHour"
      label="学时"
      width="100">
    </el-table-column>
    
    <el-table-column
      prop="score"
      label="成绩"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="150">
    </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
// import stuGradeTable from '../global/stuGradeTable.js'
import {getCookie} from '../global/cookie'
// import termOptions from '../global/termOptions.js'
export default {
    data(){
        return{
            gradeTableData: [],
            // options:termOptions,
            termSelected: '',
            courseName:'',
            courseNo:'',
            courseType:'',
            credit:'',
            overallHour:'',
            score:'',
            tag:'',
        }
    },
    computed:{
      termOptions(){
        let myData = new Date()
        var year1 = myData.getFullYear()
        let month1 = myData.getMonth()
        var options = []
        if(month1==0|| month1==1 ){
          options[0] = {
            term:(year1-1)+"2",
            label:(year1-1)+'-'+year1+'第一学期',
            value:(year1-1)+'-'+year1+'第一学期',
          },
          options[1]={
            term:(year1-1)+"1",
            label:(year1-1)+'-'+year1+'第二学期',
            value:(year1-1)+'-'+year1+'第二学期',
          }
        }else if(month1>=2&&month1<=7){
          options[0] = {
            term:(year1+1)+"1",
            label:(year1-1)+'-'+year1+'第二学期',
            value:(year1-1)+'-'+year1+'第二学期'
          },
          options[1]={
            term:(year1+1)+"2",
            label:year1+'-'+(year1+1)+'第一学期',
            value:year1+'-'+(year1+1)+'第一学期',
          }
        }else{
          options[0] = {
            term:(year1)+"1",
            label:year1+'-'+(year1+1)+'第一学期',
            value:year1+'-'+(year1+1)+'第一学期',
          },
          options[1]={
            term:(year1)+"2",
            label:year1+'-'+(year1+1)+'第二学期',
            value:year1+'-'+(year1+1)+'第二学期',
          }
        }
        
        return options
      }
    },
    methods: {
    load(){
      location.reload()
    },
    getTermSelected(){
      if(this.termSelected == ""){
          return
        }
        this.$axios
        .post('/stu/getScoreTable', { //获取查询学生学期成绩接口
            term: this.termSelected
        })
        .then((result)=> {
            if (result.data.code === 1) {
                // this.gradeTableData = result.data.datas
                const List = result.data.datas.record;
             List.forEach((item) => {
                    const classItem = {
                     courseNo: item.course && item.course.courseNo || '',
                     courseName: item.course && item.course.courseName || '',
                     courseType: item.course && item.course.courseType || '',
                     credit: item.course && item.course.credit || '',
                     overallHour:item.course && item.course.overallHour || '',
                    
                     score: item.score || '',
                     tag: item.label || '',
                  
                 };
                 this.gradeTableData.push(classItem);
              })
            } if (result.data.code === -1) {
                this.gradeTableData = []
            }else{
                console.log("查询失败");
                return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      }
    }
}
</script>