<template>
  <section class="scroll w-full relative flex items-center">
    <section
      class="overflow-scroll w-full"
      ref="scrollRef"
      @scroll="handleScroll"
      :class="{ left: isLeft, right: isRight }"
    >
      <div class="flex items-center gap-4 w-fit">
        <slot></slot>
      </div>
    </section>

    <div
      v-show="!isLeft"
      class="w-8 h-8 flex items-center justify-center rounded-full absolute left-0 -translate-x-1/2 transition-opacity z-10 cursor-pointer opacity-0"
      @click="handleLeft"
    >
      <Icon name="arrow" size="16" color="#868686" rotate="90" />
    </div>

    <div
      v-show="!isRight"
      class="w-8 h-8 flex items-center justify-center rounded-full absolute right-0 translate-x-1/2 transition-opacity z-10 cursor-pointer opacity-0"
      @click="handleRight"
    >
      <Icon name="arrow" size="16" color="#868686" rotate="-90" />
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollRef = ref<HTMLElement>();

//是否在最左边
const isLeft = ref(true);

//是否在最右边
const isRight = ref(false);

//触发滚动
const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement;

  if (el.scrollLeft === 0) {
    isLeft.value = true;
    isRight.value = false;
    return;
  }

  if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
    isLeft.value = false;
    isRight.value = true;
    return;
  }

  isLeft.value = false;
  isRight.value = false;
};

//向左滚动
const handleLeft = () => {
  if (!scrollRef.value) {
    return;
  }

  const count = Math.floor((scrollRef.value.clientWidth + 14) / 160);

  scrollRef.value.scrollTo({
    left: scrollRef.value.scrollLeft - count * 160,
    behavior: "smooth",
  });
};

//向右滚动
const handleRight = () => {
  if (!scrollRef.value) {
    return;
  }
  const count = Math.floor((scrollRef.value.clientWidth + 14) / 160);

  scrollRef.value.scrollTo({
    left: scrollRef.value.scrollLeft + count * 160,
    behavior: "smooth",
  });
};
</script>

<style scoped lang="scss">
.scroll {
  > section {
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 96px,
      black calc(100% - 96px),
      transparent 100%
    );

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .left {
    mask-image: linear-gradient(to left, transparent 0%, black 96px);
  }

  .right {
    mask-image: linear-gradient(to right, transparent 0%, black 96px);
  }

  > div {
    background-color: #252525;
    box-shadow: rgba(15, 15, 15, 0.2) 0px 0px 0px 1px,
      rgba(15, 15, 15, 0.2) 0px 2px 4px;

    &:hover {
      > i {
        background-color: rgba(#fff, 0.81);
      }
    }
  }

  &:hover {
    > div {
      opacity: 1;
    }
  }
}
</style>
