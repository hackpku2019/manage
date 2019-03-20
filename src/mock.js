const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock('/api/get-notices', 'get', () => {
  let notices = []
  for (let i = 0; i < 10; i++) {
    notices.push({
      id: Random.increment(),
      title: Random.ctitle(),
      content: Random.cparagraph(),
      author: Random.cname(),
      announceTime: new Date(Random.datetime())
    })
  }

  return notices
})
Mock.mock('/api/edit-notice', 'post', () => {})
Mock.mock('/api/remove-notice', 'post', () => {})
Mock.mock('/api/create-notice', 'post', () => {
  return Random.increment()
})
