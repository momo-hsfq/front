<template>
<div style="width:1050px">
  <el-table
    :data="taskTableData"
    style="width: 100%"
    stripe>
    <el-table-column  prop="courseNo" label="课程编号" width="100">
    </el-table-column>
    <el-table-column  prop="courseName" label="课程名称" width="200">
    </el-table-column>
    <!-- 设置课程起始时间 -->
    <el-table-column prop="area,room" label="上课地点" width="200">
      <template slot-scope="scope"> {{scope.row.area}}{{scope.row.room}} </template>
    </el-table-column>
    <el-table-column prop="day,time" label="时间" width="100">
      <template slot-scope="scope"> {{scope.row.day}}{{scope.row.time}} </template>
    </el-table-column>
   
    <!-- <el-table-column prop="info" label="详情" width="400">
    </el-table-column> -->
    <!-- <el-table-column prop="docurl" label="下载" width="150">
      <template slot-scope="scope"> 
        <el-link type="primary" :href="scope.row.docurl">下载教学大纲</el-link> 
      </template>
    </el-table-column> -->
  </el-table>
</div>
</template>

<script >
export default {
  data(){
    return{
      taskTableData:[]
    }
  },
  methods: {
    getTaskTable(){
      this.$axios
      .post('/teacher/showTeachManage', {})
      .then((result)=> {
        if (result.data.code == 1) {
          this.taskTableData = result.data.datas.teachManage
        }
      })
      .catch((error)=> {
        alert(error)
      })
    }
  },
  created(){
    this.getTaskTable()
  }
}
</script>