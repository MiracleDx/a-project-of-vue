<template>
  <div class="detail">

    <div id="title">
      <div id="left">
        <div>
          <img src="/static/images/avatars/user.jpg" style="width: 100px">
        </div>
        <div id="center">
          <span style="font-size: 25px">{{ title }}</span>
          <br>
          <span>{{ user }}</span>
          <span>&nbsp;发表于 &nbsp; {{ time }}</span>
        </div>
      </div>
      <div id="bottom">
        <el-button type="danger" class="button">编辑</el-button>
        <el-button type="danger" class="button">删除</el-button>
      </div>
    </div>

    <div id="split"></div>

    <div id="content">
      <p>{{ contentDetail }}</p>
    </div>

    <div id="split"></div>

    <div id="category">
      <span>标签:</span>
      <el-tag class="tag" v-for="o in cardData" :key="o.value" type="info">{{ o.message }}</el-tag>
    </div>

    <br>
    <br>

    <div id="commentEditor">
      <span>评论:</span>
      <div class="edit_container">
        <quill-editor v-model="commentCentent"
                      ref="myQuillEditor"
                      class="editer"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </div>
      <div id="bottom">
        <el-button type="danger" @click="isLike = !isLike" class="button">{{ zan }}</el-button>
        <el-button type="danger" class="button">发表评论</el-button>
      </div>
    </div>

    <br>
    <br>

    <div id="commentDetail">
      <div id="commentLeft">
        <img src="/static/images/avatars/user.jpg" style="width: 50px">
        <div id="commentRight">
          <span>xxx</span>
          <span>x楼</span>
          <span>2018年6月19日 22:11:46</span>
          <i class="el-icon-delete" style="color: blue"></i>
          <br>
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor' //调用编辑器

    export default {
      name: "BlogDetail",
      data () {
        return {
          title: '我是一个可爱的title',
          user: 'xxx',
          time: '2018-06-19 10:30:16',
          contentDetail: '以S.H.I.E.L.D.为名的组织，其历史最早可以追溯到几千年前的古埃及。一位大英雄带领地球人打退了外星侵略者虫族，他的盾牌被作为标志，成立一个防范重大威胁的秘密组织。历代成员包括达·芬奇、伽利略、牛顿、张衡（我国东汉时期伟大的天文学家）等伟大人物；钢铁侠的父亲霍华德·史塔克和神奇先生的父亲纳撒尼尔·理查兹也是20世纪时的成员。 [2]\n' +
          '        神盾局\n' +
          '        而S.H.I.E.L.D.，是在二战后由Nicholas Joseph Fury成立的类似于FBI、CIA的官方军事行动组织和情报机构。现任指挥官是菲尔·科尔森（Philip Coulson）。国际安全理事会专门用于同超能力英雄接洽，并进行管理的特殊部队。内战里玛丽亚·希尔领导的S.H.I.E.L.D.战队就一直负责追捕反抗组织的超级英雄们。以天空母舰（Helicarrier）为基地。\n' +
          '        曾被二战时期德国设立的秘密组织九头蛇渗透。\n' +
          '        神盾局对手九头蛇的负责人红骷髅\n' +
          '        神盾局对手九头蛇的负责人红骷髅\n' +
          '        在《美国队长2》及《神盾局特工第一季》中。九头蛇组织彻底暴露，原来他们自二战之后就一直藏在神盾局之中，借着神盾局之手在世界各地制造恐慌和动乱，逼迫人们放弃自由以换取安全。\n' +
          '        2008年“秘密入侵”后，神盾局被解散，重组为神锤H.A.M.M.E.R.，由绿魔领导。围城事件后H.A.M.M.E.R.被裁撤，S.H.I.E.L.D.回归。美国队长的女友莎朗·卡特、玛丽亚·希尔都作为组织与复仇者之间的联络人。震波女成为新的指挥官，而弗瑞由于衰迈而淡出，他的一个黑人血统儿子（也叫尼克·弗瑞）加入进来。',
          cardData: [
            {
              message: '第一篇文章'
            },
            {
              message: '第二篇文章'
            }
          ],
          commentCentent: '',
          isLike: true,
        }
      },
      methods: {
        onEditorReady(editor) {
        },
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        },
        zan() {
          if (this.isLike) {
            return "点赞";
          }  else {
            return "取消点赞";
          }
        }
      },
      mounted() {
        //初始化
      },
      components: {
        //使用编辑器
        quillEditor
      }
    }
</script>

<style scoped>

  .detail {
    width: 75%;
    margin: 0 auto;
    border: 1px solid #5daf34;
  }

  .detail #title {
    height: 135px;
  }

  .detail #title #left {
    margin: 20px;
  }

  .detail #title img {
    float: left;
    border-radius: 100%;
  }

  .detail #title #center {
    float: left;
    margin: 20px;
  }

  .detail #title #bottom {
    float: right;
    margin: 100px 20px;
  }

  .detail #commentEditor #bottom {
    float: right;
    margin: 0px 20px;
  }

  .detail #split {
    margin: 10px auto;
    width: 75%;
    border-bottom: 1px dashed #3a8ee6;
    border-width: thin;
  }

  .detail #category {
    text-align: left;
    margin: 5px 10px;
  }

  .detail #commentEditor {
    text-align: left;
    margin: 5px 10px;
  }

  .detail  #commentDetail {
    height: 100px;
    margin: 10px 10px;
  }

  .detail #commentDetail #commentLeft img {
    float: left;
    border-radius: 100%;
  }

  .detail #commentDetail #commentLeft #commentRight {
    float: left;
    margin: 5px 10px;
  }

  .edit_container {
    width: 90%;
    margin: 10px 20px;
  }

</style>
