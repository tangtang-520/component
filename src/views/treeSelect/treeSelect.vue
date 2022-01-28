<template>
  <div>
    <el-select
      :value="valueTitle"
      :clearable="clearable"
      @clear="clearHandle"
      @blur="blur"
    >
      <el-option :value="valueTitle" :label="valueTitle" class="options">
        <el-tree
          id="tree-option"
          ref="selectTree"
          :accordion="accordion"
          :data="options"
          :props="props"
          :node-key="props.value"
          :default-expanded-keys="defaultExpandedKey"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-input
              v-show="data.isEdit"
              v-model="input"
              style="margin-right: 20px; width: 100px"
              size="mini"
            ></el-input>
            <span style="margin-right: 20px" v-show="!data.isEdit">
              {{ node.label }}
            </span>
            <span v-if="permission == 'admin'">
              <i
                class="el-icon-check"
                v-if="data.isEdit"
                style="color: #67c23a"
                @click="save(data, node)"
              ></i>
              <i
                class="el-icon-edit"
                style="margin: 0px 10px; color: #409eff"
                @click="edit(node, data)"
              ></i>

              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除该组吗？"
                @confirm="confirm(data)"
              >
                <i
                  slot="reference"
                  class="el-icon-delete"
                  style="color: #f56c6c"
                  @click="deleteNode(data)"
                ></i>
              </el-popconfirm>
            </span>
          </span>
        </el-tree>
      </el-option>
    </el-select>
    <!-- 删除对话框 -->
  </div>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    // 配置项
    props: {
      type: Object,
      default() {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          tables: "tables", // 子级字段名
        };
      },
    },

    // 选项列表数据(树形结构的对象数组)
    options: {
      type: Array,
      default() {
        return [];
      },
    },

    // 初始值
    value: { type: Number, default: null },

    // 可清空选项
    clearable: { type: Boolean, default: true },

    // 自动收起
    accordion: { type: Boolean, default: false },
    // 权限
    permission: {
      type: String,
    },
  },
  data() {
    return {
      IsEdit: false,
      input: "",
      oldInputValue: "", // 保存老单节点数据
      visible: false,
      valueId: null,
      valueTitle: "",
      defaultExpandedKey: [],

      // permission: "",
    };
  },
  created() {
    // 给所有树添加 是否编辑状态  isEdit: false/true
    this.initialData(this.options);
    // console.log(this.options);
  },
  mounted() {
    (this.valueId = this.value), // 初始值
      this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        // console.log(this.valueId);
        // console.log(this.$refs.selectTree.getNode(this.valueId));
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      }
      this.initScroll();
    },

    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", this.valueId);
      this.defaultExpandedKey = [];
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
    },

    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
    // 编辑
    edit(node, data) {
      console.log("编辑");
      this.oldInputValue = data.name;
      this.qingchu(this.options);
      data.isEdit = true;
      // console.log(data);
      let Name = JSON.parse(JSON.stringify(data.name));
      this.input = Name;
      this.$set(node, "isEdit", true);
    },
    // 保存
    save(data, node) {
      if (this.oldInputValue == this.input.trim()) {
        this.$message({
          message: "组名未做修改",
          type: "warning",
        });
      } else {
        let nodeData = {
          data: data,
          name: this.input,
        };
        this.$emit("updateData", nodeData);
        data.isEdit = false;
        // console.log(data);

        // this.$nextTick(() => {
        //   console.log('11');
        //   data.isEdit = false;
        //   console.log('12');
        // });
        // this.$set(node, "isEdit", false);
        // this.$forceUpdate();
        //  this.qingchu(AllData);
      }
    },
    // 删除提示框
    deleteNode(data) {
      this.visible = true;
    },
    // 确认删除
    confirm(data) {
      // console.log(data);
      // this.value = null
      this.$emit("delete", data);
      this.valueTitle = "";
    },

    // 失去焦点
    blur() {
      this.qingchu(this.options);
    },
    // 递归修改
    qingchu(arr) {
      for (var i in arr) {
        arr[i].isEdit = false;
        if (arr[i].tables) {
          this.qingchu(arr[i].tables);
        }
      }
    },
    // 递归处理初始的数据
    initialData(arr) {
      for (var i in arr) {
        arr[i]["isEdit"] = false;
        if (arr[i].tables) {
          this.qingchu(arr[i].tables);
        }
      }
    },
  },

  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    },
  },
};
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
