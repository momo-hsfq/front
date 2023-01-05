

  module.exports = [
    {
      name: '个人中心',
      id: '1',
      sub: [{
        name: '我的主页',
        componentName: 'Stu4_1'
      }, {
        name: '修改密码',
        componentName: 'Stu4_2'
      }, {
          name: '换绑邮箱',
          componentName:'Stu4_4'
        }]},{
      name: '学工管理',
      id: '2',
      sub: [{
        name: '社会实践',
        componentName: 'SocialPractice'
      },{
        name: '课外活动',
        componentName: 'ExtracurricularActivities'
      },{
        name: '成果奖励',
        componentName: 'AchievementAndAward'
      }]
    }, {
      name: '课程管理',
      id: '3',
      sub: [{
        name: '选课中心',
        componentName: 'Stu3'
      },{
        name: '课表查询',
      componentName: 'Stu1_1'}]
    }, {
      name: '成绩查询',
      id: '4',
      sub: [{
        name: '学期成绩',
        componentName: 'Stu2'
      }]
    },{
      name: '学生互评',
      id: '5',
      sub: [{
        name: '评价中心',
        componentName: 'PeerAssessment1'
      },{
        name: '评价我的',
        componentName: 'PeerAssessment2'
      },{
        name: '我评价的',
        componentName: 'PeerAssessment3'
      }
    ]
    }]