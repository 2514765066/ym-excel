<template>
  <Transition enter-active-class="mask-enter" leave-active-class="mask-leave">
    <div
      class="mask h-screen fixed right-0 top-0 z-50 overflow-hidden"
      v-show="visible"
      @click.self="handleClose"
    >
      <Transition enter-active-class="enter" leave-active-class="leave">
        <div class="w-72 h-full flex flex-col" v-if="visible">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>({
  required: true,
});

const handleClose = () => {
  visible.value = false;
};
</script>

<style scoped lang="scss">
.mask {
  width: calc(100vw - 240px);
  -webkit-app-region: no-drag;

  > div {
    background-color: #191919;
    border-right: 1px solid #2b2b2b;
    box-shadow: 0 1px 5px 3px rgba(#000, 0.2);
  }
}

.enter {
  animation: slide 150ms linear;
}

.leave {
  animation: slide 150ms reverse linear;
}

// .content-enter {
//   animation: opacity 100ms linear;
// }

// .content-leave {
//   animation: opacity 100ms reverse linear;
// }

.mask-enter {
  animation: 150ms linear;
}

.mask-leave {
  animation: 150ms reverse linear;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

// @keyframes opacity {
//   0% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 1;
//   }
// }
</style>
