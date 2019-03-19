<template lang="pug">
  div#app
    el-menu(:default-active="$route.path", mode="horizontal", router)
      el-menu-item(index="/") 首页
      el-menu-item(index="/notice") 通知管理
      el-menu-item(index="/user") 用户管理
      el-menu-item(index="/achievement") 成就管理
      el-menu-item(index="/team") 队伍管理
    router-view
</template>
