<template lang="pug">
el-card.card(shadow="hover")
  el-row.box
    el-col.col(:span="16")
      transition(name="notice", mode="out-in")
        div.notice(v-if="!editing")
          h2 {{ noticeData.title }}
          p {{ noticeData.content }}
          div
            span {{ noticeData.author }} |
            span.secondary {{ ' ' + noticeData.announceTime.toLocaleString() }}
        el-form.notice(v-else, label-width="4rem", key="edit")
          el-form-item(label="标题")
            el-input(v-model="editData.title")
          el-form-item(label="内容")
            el-input(type="textarea", v-model="editData.content", autosize)
          el-form-item.last-form-item(label="发布者")
            el-input(v-model="editData.author", placeholder="HackPKU组委会")
    el-col.col(:span="8")
      div.manage
        el-button.button(v-if="!editing", @click="edit()") 编辑
        el-button.button(v-else, @click="$emit('save', {editData, cb: saveCallback})", type="success") 保存
        el-button.button(v-if="!editing", @click="remove()", type="danger") 删除
        el-button.button(v-else, @click="editing = false") 取消
</template>

<script>
export default {
  props: {
    noticeData: {
      id: Number,
      title: String,
      content: String,
      author: String,
      announceTime: Date
    }
  },
  data () {
    return {
      editing: false,
      editData: {
        id: 0,
        title: '',
        content: '',
        author: ''
      }
    }
  },
  methods: {
    edit () {
      Object.assign(this.editData, this.noticeData)
      this.editing = true
    },
    remove () {
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$emit('remove', {
          cb: this.removeCallback
        })
      }).catch(() => {})
    },
    removeCallback (s, err) {
      if (!s) {
        this.$message.success('操作成功。')
      } else {
        this.$message.error('删除失败：' + err)
      }
    },
    saveCallback (s, err) {
      if (!s) {
        this.editing = false
        this.$message.success('操作成功。')
      } else {
        this.$message.error('保存失败：' + err)
      }
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.box {
  min-height: 15rem;
  transition: min-height .5s;
}
.col {
  min-height: inherit;
  max-height: 888rem;
  display: flex;
  align-items: center;
}
.col:first-of-type {
  border-right: 1px solid #E4E7ED;
}
.notice {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.secondary {
  color: #909399;
}
.manage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  margin: .5rem;
  width: 80%;
  transition: all .5s;
}
.el-form-item:last-of-type {
  margin: 0;
}
.notice-enter, .notice-leave-to {
  opacity: 0;
}
.notice-enter-active, .notice-leave-active {
  transition: all .5s;
}
</style>
