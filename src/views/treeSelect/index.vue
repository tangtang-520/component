<template>
  <div>
    <treeSelect
      :permission="admin"
      :props="props"
      :options="listData"
      :value="valueId"
      :clearable="isClearable"
      :accordion="isAccordion"
      @getValue="getValue($event)"
      @updateData="updateData($event)"
      @delete="deleteTreeData($event)"
    />
  </div>
</template>

<script>
import treeSelect from "./treeSelect.vue";
export default {
  components: {
    treeSelect,
  },
  data() {
    return {
      admin: "admin", // 编辑权限
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: null, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "tables",
        // disabled:true
      },
      listData: [
        {
          id: 1,
          pid: 0,
          name: "是的发送到",
          pos: 1,
          isGroup: true,
          tables: [],
        },
        {
          id: 6,
          pid: 0,
          name: "是打发点是",
          pos: 2,
          isGroup: true,
          tables: [
            {
              id: 51,
              pid: 6,
              name: "是的发送到",
              pos: 1,
              isGroup: true,
              tables: [],
            },
            {
              id: 52,
              pid: 6,
              name: "三生三世",
              pos: 2,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 3,
          pid: 0,
          name: "资源一部",
          pos: 3,
          isGroup: true,
          tables: [
            {
              id: 60,
              pid: 3,
              name: "水电费",
              pos: 1,
              isGroup: true,
              tables: [],
            },
            {
              id: 14,
              pid: 3,
              name: "手动阀",
              pos: 2,
              isGroup: true,
              tables: [],
            },
            {
              id: 18,
              pid: 3,
              name: "撒的方法",
              pos: 3,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 33,
          pid: 0,
          name: "是的发送到个",
          pos: 4,
          isGroup: true,
          tables: [
            {
              id: 34,
              pid: 33,
              name: "全额群翁",
              pos: 1,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 43,
          pid: 0,
          name: "森岛帆高",
          pos: 5,
          isGroup: true,
          tables: [],
        },
        {
          id: 22,
          pid: 0,
          name: "2认为群",
          pos: 6,
          isGroup: true,
          tables: [
            {
              id: 24,
              pid: 22,
              name: "似懂非懂飞",
              pos: 1,
              isGroup: true,
              tables: [],
            },
            {
              id: 27,
              pid: 22,
              name: "是打发点",
              pos: 2,
              isGroup: true,
              tables: [],
            },
            {
              id: 28,
              pid: 22,
              name: "预计",
              pos: 3,
              isGroup: true,
              tables: [],
            },
            {
              id: 25,
              pid: 22,
              name: "和借款用途",
              pos: 4,
              isGroup: true,
              tables: [],
            },
            {
              id: 26,
              pid: 22,
              name: "开会高考题",
              pos: 5,
              isGroup: true,
              tables: [],
            },
            {
              id: 30,
              pid: 22,
              name: "物流",
              pos: 6,
              isGroup: true,
              tables: [],
            },
            {
              id: 37,
              pid: 22,
              name: "财务",
              pos: 7,
              isGroup: true,
              tables: [],
            },
            {
              id: 32,
              pid: 22,
              name: "平台",
              pos: 8,
              isGroup: true,
              tables: [],
            },
            {
              id: 36,
              pid: 22,
              name: "独立站",
              pos: 9,
              isGroup: true,
              tables: [],
            },
            {
              id: 38,
              pid: 22,
              name: "设计是的",
              pos: 10,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 39,
          pid: 0,
          name: "订单信息",
          pos: 7,
          isGroup: true,
          tables: [],
        },
        {
          id: 8,
          pid: 0,
          name: "停用",
          pos: 8,
          isGroup: true,
          tables: [],
        },
        {
          id: 9,
          pid: 0,
          name: "代理库",
          pos: 9,
          isGroup: true,
          tables: [],
        },
        {
          id: 19,
          pid: 0,
          name: "支付部",
          pos: 10,
          isGroup: true,
          tables: [
            {
              id: 48,
              pid: 19,
              name: "支付宝分组",
              pos: 1,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 16,
          pid: 0,
          name: "邮箱管理",
          pos: 11,
          isGroup: true,
          tables: [],
        },
        {
          id: 10,
          pid: 0,
          name: "PZ组",
          pos: 12,
          isGroup: true,
          tables: [],
        },
        {
          id: 15,
          pid: 0,
          name: "技术部",
          pos: 13,
          isGroup: true,
          tables: [
            {
              id: 46,
              pid: 15,
              name: "技术部相关",
              pos: 1,
              isGroup: true,
              tables: [],
            },
            {
              id: 47,
              pid: 15,
              name: "网站测试",
              pos: 2,
              isGroup: true,
              tables: [],
            },
            {
              id: 58,
              pid: 15,
              name: "运维部",
              pos: 3,
              isGroup: true,
              tables: [],
            },
            {
              id: 59,
              pid: 15,
              name: "技术部不再使用",
              pos: 4,
              isGroup: true,
              tables: [],
            },
            {
              id: 63,
              pid: 15,
              name: "账号相关",
              pos: 5,
              isGroup: true,
              tables: [],
            },
          ],
        },
        {
          id: 45,
          pid: 0,
          name: "产品培训",
          pos: 14,
          isGroup: true,
          tables: [],
        },
        {
          id: 2,
          pid: 0,
          name: "部门账号",
          pos: 15,
          isGroup: true,
          tables: [],
        },
        {
          id: 49,
          pid: 0,
          name: "工具服务提醒",
          pos: 16,
          isGroup: true,
          tables: [],
        },
        {
          id: 50,
          pid: 0,
          name: "客服系统",
          pos: 17,
          isGroup: true,
          tables: [],
        },
        {
          id: 17,
          pid: 0,
          name: "和融合了森岛帆高",
          pos: 18,
          isGroup: true,
          tables: [],
        },
        {
          id: 55,
          pid: 0,
          name: "打舒服个",
          pos: 19,
          isGroup: true,
          tables: [],
        },
        {
          id: 57,
          pid: 0,
          name: "dgsdfm",
          pos: 20,
          isGroup: true,
          tables: [],
        },
        {
          id: 5,
          pid: 0,
          name: "测试",
          pos: 21,
          isGroup: true,
          tables: [
            {
              id: 62,
              pid: 5,
              name: "很长很长很长很长很长很长很长",
              pos: 1,
              isGroup: true,
              tables: [],
            },
          ],
        },
      ],
    };
  },
  methods: {
    getValue(value) {
      this.valueId = value;
      console.log(value);
    },
    // 保存数据
    updateData(nodeData) {
      console.log(nodeData);
      // 调接口
    },
    // 删除组
    deleteTreeData(nodeData) {
      console.log(nodeData.id);
      // 调接口
    },
  },
};
</script>

<style></style>
