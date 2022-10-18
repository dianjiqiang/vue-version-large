import { ref, onUnmounted } from "vue";
import * as echarts from "echarts";
export default function useEchart(divEl) {
  let echartInstance = ref(null);
  echartInstance.value = echarts.init(divEl, null, { renderer: "svg" });

  onUnmounted(() => {
    echartInstance.value.dispose();
  });

  function resizeEchart() {
    echartInstance.value.resize();
  }

  function setOption(option) {
    echartInstance.value.setOption(option);
  }

  return {
    resizeEchart,
    setOption,
    echartInstance,
  };
}
