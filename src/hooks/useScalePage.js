import { onMounted, onUnmounted } from "vue";
import _ from "lodash";

export default function useScalePage() {
  let resizeChange = _.throttle(function () {
    triggerScale();
  }, 100);

  onMounted(function () {
    triggerScale();
    window.addEventListener("resize", resizeChange);
  });

  onUnmounted(function () {
    console.log("useScale onUnmounted");
    window.removeEventListener("resize", resizeChange);
  });

  function triggerScale(option = {}) {
    let targetX = option.targetX || 1920;
    let targetY = option.targetY || 1080;
    let targetRatio = option.targetRatio || 16 / 9;

    // 1.拿到当前屏幕的宽高
    let currentX =
      document.documentElement.clientWidth || document.body.clientWidth;
    let currentY =
      document.documentElement.clientHeight || document.body.clientHeight;

    // 2.计算缩放的比例
    let scaleRatio = currentX / targetX;

    // 当前的屏幕宽高比
    let currentRatio = currentX / currentY;
    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY;
      // 3.设置缩放( 类似图片放大 )
      document.body.setAttribute(
        "style",
        `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio})  translateX(-50%); left:50%`
      );
    } else {
      // 3.设置缩放( 类似图片放大 )
      document.body.setAttribute(
        "style",
        `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio})`
      );
    }
  }
}
