const Mock = require('mockjs')

const List = []
const deviceList = []
const warnList = []
const count = 10

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

let idd = 1
for (let i = 0; i < count; i++) {
  idd = Mock.mock('@increment')
  List.push(Mock.mock({
    id: idd,
    timestamp: +Mock.Random.now('T') - i * 10000, // 不能random 要有序
    type: '@first',
    'location|1': [
      '张家界', '黄松峪', '塞罕坝', '翔云岛', '黄羊山', '武安', '木兰围场', '黄河故道'
    ],
    'content|1': [
      '{"设备编号":"CATCXM-01","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35535}"}',
      '{"设备编号":"LoRaWAN_COTAA_0","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":25535}"}',
      '{"设备编号":"LoRaWAN_COTAA_1","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35235}"}',
      '{"设备编号":"LoRaWAN_COTAA_2","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35972}"}'
    ],
    content_short: 'mock data',
    importance: '@integer(1, 3)',
    'type|1': ['WM', 'GM', 'YM', 'QM'],
    'status|1': ['normal', 'alarm'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))

  warnList.push(Mock.mock({
    id: idd,
    'name|1': [
      '通用1-1规则',
      '张家界实验规则2-1',
      '黄羊山实验规则3-2',
      '武安实验规则4-1',
      '通用2-2规则'
    ],
    relate: '混合传感器',
    'condition|1': [
      '设备上线', '(tp > 30)', '(tp > 20 && volt < 60))', '(level<124)'
    ],
    'action|1': [
      '---', '控制指令', '短信告警', '研发分派', '负责人指派'
    ],
    create: +Mock.Random.now('T') - i * 1000200,
    'status|1': ['已启用', '已禁用']
  }))

  deviceList.push(Mock.mock({
    id: idd,
    timestamp: +Mock.Random.now('T') - i * 10000, // 不能random 要有序
    type: '@first',
    'location|1': [
      '张家界', '黄松峪', '塞罕坝', '翔云岛', '黄羊山', '武安', '木兰围场', '黄河故道'
    ],
    'life|1': [
      '122天', '20小时', '2年', '98天', '3小时', '284天'
    ],
    last_update: +Mock.Random.now('T') - i * 110000,
    'content|1': [
      '{"设备编号":"CATCXM-01","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35535}"}',
      '{"设备编号":"LoRaWAN_COTAA_0","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":25535}"}',
      '{"设备编号":"LoRaWAN_COTAA_1","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35235}"}',
      '{"设备编号":"LoRaWAN_COTAA_2","数据类型":"光敏数据","数据信息":"{"is_auto":1,"light_sw":1,"lux_value":35972}"}'
    ]
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/devicelist',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = deviceList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/warnlist',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = warnList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

