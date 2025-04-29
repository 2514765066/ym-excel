<template>
  <Tip :content="data.name" placement="right">
    <section
      class="cursor-pointer flex items-center px-2 gap-1.5 rounded-md w-full"
      :class="{
        active: route.path == '/table' && selectedName == data.name,
      }"
      @click="handleClick"
    >
      <Icon name="table" size="20" color="#989898" />

      <span
        class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
      >
        {{ data.name }}
      </span>
    </section>
  </Tip>
</template>

<script setup lang="ts">
import Tip from "@/components/Tooltip/Tip.vue";
import { Workbook } from "@type/index";
import { useTableStore } from "@/stores/tableStore";

const { selectedName } = storeToRefs(useTableStore());
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  data: Workbook;
}>();

const handleClick = () => {
  selectedName.value = props.data.name;

  router.push("/table");
};
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  > button {
    transition: 0.1s;

    &:hover {
      background-color: #383838;
    }
  }

  &:hover {
    background-color: #2c2c2c;

    > button {
      opacity: 1;
    }
  }
}

.active {
  background-color: #2c2c2c;

  > span {
    color: rgba(#fff, 0.81);
  }
}
</style>
