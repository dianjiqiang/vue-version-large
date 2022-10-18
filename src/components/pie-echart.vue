<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import useEchart from "@/hooks/useEchart";
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  echartDatas: {
    type: Object,
    default: function () {
      return [];
    },
  },
});
let divRef = ref(null);
let hyEchart = null;

watch(
  () => props.echartDatas,
  (newV, oldV) => {
    setupEchart(newV); // 显示网络请求的数据
  }
);
onMounted(() => {
  setupEchart(props.echartDatas); // 显示默认的数据
});

function setupEchart(echartDatas) {
  if (!hyEchart) {
    hyEchart = useEchart(divRef.value);
  }
  let option = getOption(echartDatas);
  hyEchart.setOption(option);
}

function getOption(pieDatas = []) {
  // let pieDatas = props.echartDatas;

  let colors = pieDatas.map((item) => {
    return item.color;
  });

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
    };
  });

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  let option = {
    // backgroundColor: 'rbg(40,46,72)',
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: "vertical",
      right: "10%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",
      formatter: function (name) {
        var currentItem = pieDatas.find((item) => item.name === name);
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        );
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false,
        },
        data: data,
        roseType: "area",
      },
    ],
  };
  return option;
}
</script>
