<template>
  <div class="wrapper">
    <div class="tip-wrapper">
      <div class="tip-content">
        <div class="tip"><div style="background-color:#0C8918;" /><span>端节点正常同步大于90%</span></div>
        <div class="tip"><div style="background-color:#FF4C00;" /><span>端节点正常同步60%至90%</span></div>
        <div class="tip"><div style="background-color:#BF242A;" /><span>端节点正常同步小于60%</span></div>
      </div>
      <div class="tip-content">
        <div class="tip"><i class="el-icon-cloudy" /><span>端节点正常同步大于90%</span></div>
        <div class="tip"><i class="el-icon-upload" /><span>端节点正常同步60%至90%</span></div>
        <div class="tip"><i class="el-icon-cpu" /><span>端节点正常同步小于60%</span></div>
      </div>
    </div>
    <div class="tree-container">
      <el-tree
        :data="clusterData"
        :props="defaultProps"
        default-expand-all
        class="tree"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <el-popover
            placement="right"
            trigger="click"
            popper-class="pop-wrap"
          >
            <div>
              <ul>
                <li>备份情况：{{ data.backup }}</li>
                <li>上传情况：{{ data.upload }}</li>
                <li>延迟节点：{{ data.delay }}</li>
                <li>告警事件：{{ data.alert }}</li>
                <li>区域状态：{{ data.status }}</li>
              </ul>
            </div>
            <div slot="reference">
              <i :class="data.icon" />
              <span :class="getNodeStatus(data)">{{ node.label }}</span>
            </div>
          </el-popover>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cluster',
  data() {
    return {
      clusterData: [{
        label: '华南地区',
        icon: 'el-icon-cloudy',
        backup: 1,
        upload: 1,
        delay: 1,
        alert: 1,
        status: 1
      }, {
        label: '华北地区',
        icon: 'el-icon-cloudy',
        backup: 1,
        upload: 1,
        delay: 1,
        alert: 1,
        status: 1
      }, {
        label: '华中地区',
        icon: 'el-icon-cloudy',
        backup: 1,
        upload: 1,
        delay: 1,
        alert: 1,
        status: 1
      }, {
        label: '西南地区',
        icon: 'el-icon-cloudy',
        backup: 1,
        upload: 1,
        delay: 1,
        alert: 1,
        status: 1,
        children: [{
          label: '重庆市',
          icon: 'el-icon-upload',
          backup: 1,
          upload: 1,
          delay: 1,
          alert: 1,
          status: 1
        }, {
          label: '四川省',
          icon: 'el-icon-upload',
          backup: 1,
          upload: 1,
          delay: 1,
          alert: 1,
          status: 1,
          children: [{
            label: '九寨沟',
            icon: 'el-icon-cpu',
            backup: 1, // 备份情况
            upload: 1, // 上传情况
            delay: 1, // 延迟节点
            alert: 1, // 告警事件
            status: 1, // 区域状态
            value: 10// 端节点同步百分比（用于判断叶子节点颜色显示）
          }, {
            label: '贡嘎山',
            icon: 'el-icon-cpu',
            backup: 1,
            upload: 1,
            delay: 1,
            alert: 1,
            status: 1,
            value: 60
          }, {
            label: '老君山',
            icon: 'el-icon-cpu',
            backup: 1,
            upload: 1,
            delay: 1,
            alert: 1,
            status: 1,
            value: 100
          }]
        }, {
          label: '贵州省',
          icon: 'el-icon-upload',
          backup: 1,
          upload: 1,
          delay: 1,
          alert: 1,
          status: 1,
          children: [{
            label: '六盘水',
            icon: 'el-icon-cpu',
            backup: 1,
            upload: 1,
            delay: 1,
            alert: 1,
            status: 1,
            value: 55
          }, {
            label: '阿哈湖',
            icon: 'el-icon-cpu',
            backup: 1,
            upload: 1,
            delay: 1,
            alert: 1,
            status: 1,
            value: 60
          }]
        }, {
          label: '云南省',
          icon: 'el-icon-upload',
          backup: 1,
          upload: 1,
          delay: 1,
          alert: 1,
          status: 1,
          children: [{
            label: '轿子山',
            icon: 'el-icon-cpu',
            backup: 1,
            upload: 1,
            delay: 1,
            alert: 1,
            status: 1,
            value: 55
          }]
        }]
      }, {
        label: '西北地区',
        icon: 'el-icon-cloudy',
        backup: 1,
        upload: 1,
        delay: 1,
        alert: 1,
        status: 1
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    getNodeStatus(data) {
      if (!data.value && data.vlaue !== 0) {
        return ''
      }
      if (data.value < 60) {
        return 'red'
      } else if (data.value >= 60 && data.value <= 90) {
        return 'yellow'
      } else if (data.value > 90) {
        return 'green'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    padding: 10px 20px;
    height: 100% !important;
    background-image: url(../../assets/cluster/438.png);
    background-size: 100% 100%;
    i{
      margin-right: 3px;
      color: #1890ff;
    }
    .tip-wrapper{
      margin-bottom: 10px;
      .tip-content{
        display: inline-block;
        margin-right: 40px;
        .tip{
          div{
            display: inline-block;
            border-radius: 2px;
            width:10px;
            height:10px;
            margin-right: 5px;
          }
          span{
            font-size: 12px;
            color:#919CC1;
          }
        }
      }
    }
    .tree-container{
      margin-bottom: 158px;
      .el-tree{
        border-radius: 5px;
        max-height: 700px;
        width:600px;
        overflow: hidden;
        background-image: url(../../assets/cluster/422.png);
        background-color: rgb(5 16 38 / 46%);
        background-size: 100% 100%;
        padding:20px 70px;
      }
      .custom-tree-node {
        font-size: 14px;
        padding-right: 8px;
        font-family: 'SourceHanSansCN-Regular';
        color:#919CC1;
      }
    }
  }
  .red{
    color: #BF242A;
  }
  .yellow{
    color:#FF4C00;
  }
  .green{
    color: #0C8918;
  }
 .el-tree ::v-deep {
    .el-tree-node__content:hover {
        background-color: #b8c3d329 !important;
    }
    .el-tree-node:focus > .el-tree-node__content {
        background-color: #b8c3d329 !important;
    }
    .el-tree-node__content {
      position: relative;
    }

    .el-tree-node:last-child > .el-tree-node__content::before {
      content: "";
      width: 1px;
      height: 10000px;
      background-color: #595959;
      position: absolute;
      margin-left: -9px;
      bottom: 13px;
    }

    .el-tree-node__children .el-tree-node__content::after {
      content: "";
      width: 20px;
      height: 1px;
      background-color: #595959;
      position: absolute;
      margin-left: -9px;
    }

    .el-tree-node__content > .el-tree-node__expand-icon {
      padding: 6px 3px;
    }
  }
</style>

<style>
.el-popper[x-placement^=right] .popper__arrow::after {
  border-right-color: rgba(5, 29, 66, 1);
}
.el-popper[x-placement^=right] {
  background-image: url(../../assets/cluster/426.png);
  background-size: 100% 100%;
  border: none;
}
li{
  list-style: none;
  color: #fff;
  font-size: 12px;
  font-family: 'SourceHanSansCN-Regular';
}
ul {
  padding-inline-start: 10px;
  margin-block-start: 0em;
  margin-block-end: 0em;
}
</style>
