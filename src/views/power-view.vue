<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie-echart :echartDatas="powerData.chargingPile.data" />
    </div>

    <div class="left-bottom">
      <line-echart :echartDatas="powerData.processMonitoring.data" />
    </div>

    <div class="right-top">
      <right-top-panel
        :percentage="powerData.chargingTop4.totalPercentage"
        :panelItems="powerData.chargingTop4.data"
      />
    </div>

    <div class="right-center">
      <bar-echart :echartDatas="powerData.chargingStatistics.data"></bar-echart>
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="powerData.exceptionMonitoring.data" />
    </div>

    <div class="center">
      <CenterSvg></CenterSvg>
    </div>
    <div class="bottom">
      <bottom-panel :panelItems="powerData.dataAnalysis.data" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import PieEchart from "@/components/pie-echart.vue";
import LineEchart from "@/components/line-echart.vue";
import BarEchart from "@/components/bar-echart.vue";
import RightBottomSvg from "@/components/right-bottom-svg.vue";
import CenterSvg from "@/components/center-svg.vue";
import RightTopPanel from "@/components/right-top-panel.vue";
import BottomPanel from "@/components/bottom-panel.vue";

import { getPowerScreenData } from "../services";
import defaultHomeData from "./config/default-home-data.json";
let powerData = ref(defaultHomeData);

// 发起网络请求
getPowerScreenData().then((res) => {
  powerData.value = res.data;
});
</script>

<style scoped lang="scss">
@mixin bgstyle() {
  background-color: red;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* @include bgstyle() */
}

.screen-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
}

.header {
  position: absolute;
  top: 21px;
  left: 0;
  width: 100%;
  height: 56px;

  background-image: url(@/assets/images/bg_header.svg);
}

.left-top {
  /* 定位 */
  position: absolute;
  left: 16px;
  top: 116px;
  width: 536px;
  height: 443px;

  /* 背景 */
  background-image: url(@/assets/images/bg_left-top.svg);
}

.left-bottom {
  /* 定位 */
  position: absolute;
  left: 16px;
  bottom: 49px;
  height: 443px;
  width: 536px;
  /* 背景 */
  background-image: url(../assets/images/bg_left_bottom.svg);
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
}

.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
}

.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
}
.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;

  /* border: 2px solid pink; */
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
}
</style>
