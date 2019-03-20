<template lang="pug">
el-row
  el-col.notice-container(:span="20", :offset="2")
    el-button.button(icon="el-icon-plus" @click="newNotice.showDialog = true") 新建通知
    transition-group(v-if="notices.length !== 0", name="notice")
      notice.notice-item(v-for="(x, ind) in notices", :notice-data="x", @save="saveNotice(ind, $event)", @remove="removeNotice(ind, $event)", :key="x.id")
    el-card.empty-notice(v-else, shadow="hover")
      div 空空的~
    el-dialog(title="新建通知" :visible.sync="newNotice.showDialog")
      el-form(label-width="4rem")
        el-form-item(label="标题")
          el-input(v-model="newNotice.title")
        el-form-item(label="内容")
          el-input(type="textarea", v-model="newNotice.content")
        el-form-item(label="发布者")
          el-input(v-model="newNotice.author")
        el-form-item
          el-button(type="primary", @click="createNotice") 提交
</template>

<script>
import Notice from '../components/Notice'

export default {
  data () {
    return {
      notices: [],
      newNotice: {
        showDialog: false,
        title: '',
        content: '',
        author: ''
      }
    }
  },
  mounted () {
    this.$axios.get('/api/get-notices').then(res => {
      this.notices = res.data.reverse()
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    createNotice () {
      let noticeData = {
        title: this.newNotice.title,
        content: this.newNotice.content,
        author: this.newNotice.author,
        announceTime: new Date()
      }
      this.$axios.post('/api/create-notice', noticeData).then(res => {
        noticeData.id = parseInt(res.data)
        this.notices.unshift(noticeData)
        this.$message.success('操作成功')
        Object.assign(this.newNotice, {
          showDialog: false,
          title: '',
          content: '',
          author: ''
        })
      }).catch(err => {
        this.$message.error(err)
      })
    },
    saveNotice (ind, e) {
      let noticeData = Object.assign({}, e.editData, {
        announceTime: new Date()
      })
      this.$axios.post('/api/edit-notice', noticeData).then(res => {
        e.cb(0)
        this.notices.splice(ind, 1, noticeData)
      }).catch(err => {
        e.cb(1, err)
      })
    },
    removeNotice (ind, e) {
      this.$axios.post('/api/remove-notice', {
        id: this.notices[ind].id
      }).then(res => {
        this.notices.splice(ind, 1)
        e.cb(0)
      }).catch(err => {
        e.cb(1, err)
      })
    }
  },
  components: {
    notice: Notice
  }
}
</script>

<style scoped>
.button {
  margin-bottom: 1rem;
}
.empty-notice {
  width: 95%;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}
.notice-container {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notice-enter {
  transform: translateY(-5rem);
  opacity: 0;
}
.notice-leave-active {
  position: absolute;
}
.notice-leave-to {
  transform: translateY(5rem);
  opacity: 0;
}
.notice-item {
  width: 99%;
  transition: all .5s;
}
</style>
