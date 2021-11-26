<!--  -->
<template>
  <div class="Content">
    <div class="search_header">
      <input
        ref="inputRef"
        type="text"
        class="input"
        placeholder="请选择"
        autocomplete="off"
        v-model="inputValue"
        :readonly="status ? false : 'readonly'"
        @mousedown="inputClick"
        @blur="blur"
        @input="handleInput"
        @mouseover="mouseover"
        @mouseout="mouseout"
      />
      <span class="iconStyle" v-show="arrow">
        <i ref="icon" class="el-icon-arrow-up"></i>
      </span>
      <span class="iconStyle" @mouseover="mouseover" v-show="clearShow">
        <i ref="iconCleat" @mousedown="empty" class="el-icon-circle-close"></i>
      </span>
    </div>
    <div
      v-show="show"
      class="list-view"
      ref="container"
      @scroll="handleScroll($event)"
    >
      <!-- 承接所有数据 显示滚动条 -->
      <div
        class="list-view-phantom"
        ref="clientHeight"
        :style="{ height: contentHeight + 'px' }"
      ></div>
      <!-- 渲染列表 -->
      <ul ref="content" class="list-view-content">
        <li
          ref="itemStyle"
          :class="{ active: index == nowIndex }"
          v-for="(item, index) in list"
          :key="index"
          @mousedown="mousedown(item, index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      // 搜索功能开关
      type: Boolean,
      default: false,
    },
    clear: {
      // 清除功能开关
      type: Boolean,
      default: false,
    },
    value: String,
  },
  data() {
    return {
      status: true,
      data: [],
      AllData: [],
      itemHeight: 30, //每一项数据的高度
      list: [], // 需要渲染的数据
      inputValue: "",
      nowIndex: "xxx12*（）",
      val: "", // 保存选中的值
      show: false,
      rotate: false,
      clearShow: false,
      arrow: true,
      scroll: 0, // 滚动的距离
    };
  },
  model: {
    prop: "value",
    event: "cc",
  },
  watch: {
    inputValue(val) {
      if (this.search == true) {
        if (val != "") {
          this.fuzzyQuery(this.AllData, val);
          this.nowIndex = "xxx12*（）";
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] == this.val) {
              this.nowIndex = i;
            }
          }
        }
        // if (val == "") {
        //   this.updated();
        // }
      }
    },

    // show(val) {
    //   if (val == true) {
    //     this.updated();
    //     this.nowIndex = "xxx12*（）";
    //     for (let i = 0; i < this.list.length; i++) {
    //       if (this.list[i] == this.val) {
    //         this.nowIndex = i;
    //       }
    //     }
    //   }
    // },
  },
  created() {
    this.AllData = this.data; // 保存最初始的所有数据
  },
  mounted() {
    this.getData(); //虚拟数据
    this.updated();
  },
  computed: {
    contentHeight() {
      return this.data.length * this.itemHeight;
    },
  },
  methods: {
    handleInput(event) {
      var value = event.target.value;
      this.$emit("cc", value); //触发 input 事件，并传入新值
    },
    getData() {
      //创建模拟数据
      let data = [];
      for (let i = 0; i < 1000000; i++) {
        data.push(`第 ${i} 个数据`);
      }
      this.data = [...data];
      this.AllData = [...data];
    },
    updated(screenTop = 0) {
      console.log("updated");
      // 获取展示数量
      // const count = 10;
      // console.log(this.$el.clientHeight);
      const count = Math.ceil(this.$el.clientHeight / this.itemHeight);
      // 取得可见区域的起始数据索引
      const start = Math.floor(screenTop / this.itemHeight);
      // 取得可见区域的结束数据索引
      const end = start + count;
      // 计算出可见区域对应的数据，让 Vue.js 更新
      this.list = this.data.slice(start, end);
      // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        start * this.itemHeight
      }px, 0)`;
    },
    // 监听滚动
    handleScroll(e) {
      const scrollTop = this.$refs.container.scrollTop;
      this.updated(scrollTop);
      this.nowIndex = "xxx12*（）"; //  随便取一个值 反正不是索引
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] == this.val) {
          this.nowIndex = i;
        }
      }
    },
    // 模糊搜索
    fuzzyQuery(list, keyWord) {
      const arr = [];
      let i = 0;
      while (list[i]) {
        if (list[i].match(keyWord) != null) {
          arr.push(list[i]);
        }
        i++;
      }
      this.data = arr;
      this.updated();
    },
    mousedown(val, index) {
      this.val = val;
      this.inputValue = val;
      this.nowIndex = index;
      this.$nextTick(() => {
        this.data = this.AllData;
      });

      this.$emit("cc", this.val);
    },
    // input 失去焦点
    blur() {
      console.log("blur");
      this.show = false;
      this.$refs.icon.style.transform = "rotate(0deg)";
      this.$refs.icon.style.transition = "all 0.3s";
      this.$refs.inputRef.style.borderColor = "";
      if (this.search == true) {
        this.inputValue = this.val;
      }
    },
    mouseover() {
      this.$refs.inputRef.style.cursor = "pointer";
      if (this.clear == true && this.inputValue != "") {
        this.clearShow = true;
        this.arrow = false;
      }
    },
    mouseout() {
      this.arrow = true;
      this.clearShow = false;
    },
    // 清除
    empty() {
      console.log("empty");
      this.$refs.container.scrollTop = 0;
      this.arrow = true;
      this.clearShow = false;
      this.inputValue = "";
      this.nowIndex = "xxx12*（）";
      this.val = "";
      this.$refs.inputRef.placeholder = "请选择";
      this.$emit("cc", this.val);
      if (this.search == true) {
        this.$refs.container.scrollTop = 0;
        this.updated();
      }
    },
    inputClick() {
      this.show = !this.show;
      if (this.show == false) {
        this.$refs.icon.style.transform = "rotate(0deg)";
        this.$refs.icon.style.transition = "all 0.3s";
      } else {
        this.$refs.icon.style.transform = "rotate(180deg)";
        this.$refs.icon.style.transition = "all 0.3s";
        this.$refs.inputRef.style.borderColor = "#409eff";
        if (this.inputValue === "" && this.search == false) {
          this.$nextTick(() => {
            this.$refs.container.scrollTop = 0;
          });
        }
      }
      if (this.search == true) {
        this.$nextTick(() => {
          this.data = this.AllData;
          this.nowIndex = "xxx12*（）";
          this.updated();
        });
        this.status = true;
      } else {
        this.status = false;
      }
      if (this.search == true && this.inputValue != "") {
        this.$refs.inputRef.placeholder = this.inputValue;
        this.inputValue = "";
        this.$nextTick(() => {
          this.$refs.container.scrollTop = 0;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list-view::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
.list-view::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px #fafafa;
  background: rgba(0, 0, 0, 0.075);
}
.Content {
  width: 238px;
  // height: 40px;
  height: 182px;
  cursor: pointer;
}
.list-view {
  // width: 238px;
  // height: 182px;
  border-radius: 5px;
  margin: auto;
  border: 1px solid #eee;
  position: relative;
  overflow: auto;
  cursor: pointer;
  // z-index: -3;
  // z-index: 9999;
}
.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.list-view-content {
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  position: relative;
  padding: 0px;
  margin: 5px 0px;
  li {
    text-align: left;
    list-style-type: none;
    padding: 0px 20px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
    color: "";
    box-sizing: border-box;
  }
}
.list-view-content li:hover {
  background-color: #f2f2f2;
}
.list-view-item {
  padding: 6px;
  color: #999;
  line-height: 30px;
}
.active {
  color: #409eff;
}
.input {
  outline: none;
  padding: 0px 30px 0px 15px;
  background-color: #fff;
  border-radius: 4px;
  color: #606266;
  border: 1px solid #eee;
  font-size: inherit;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.input::placeholder {
  color: rgb(207, 204, 204);
  font-size: 14px;
}
.search_header {
  width: 100%;
  height: 40px;
  position: relative;
  span {
    height: 100%;
    width: 20px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 4px;
    top: 0px;
  }
  .iconStyle {
    i {
      text-align: center;
      color: #c0c4cc;
      transition: all 0.3s;
    }
  }
}
</style>
