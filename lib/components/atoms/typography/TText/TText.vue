<template>
  <component
    :is="tag"
    :class="[
      'tds-break-words',
      typographyClasses,
      className,
    ]"
  >
    <slot :text="text">
      {{ text }}
    </slot>
  </component>
</template>

<script setup lang="ts">

import useTypography from '@/composables/typography/useTypography';

import type { TTextProps, TTextSlot } from './TText.types';

const props = withDefaults(defineProps<TTextProps>(), {
  tag: 'p',
  variant: 'body',
  size: 'normal',
  spacing: 'spread',
  bold: false,
  truncate: false,
  text: '',
  className: undefined,
  displaySize: undefined,
  bodySize: undefined,
  linkSize: undefined,
});

const { typographyClasses } = useTypography(props);

defineSlots<{
  /**
   * The text to display in the `TText` component.
   */
  default(props: TTextSlot): string
}>();
</script>

<style scoped>

</style>
