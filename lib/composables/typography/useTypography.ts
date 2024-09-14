import type { MaybeRefOrGetter } from 'vue';
import { ref, toValue, watchEffect } from 'vue';

import type {
  Spacing, TailwindTextVariants, TextSize, TextVariant,
} from '@/types/typography';

type BaseTypographyProps = {
  spacing?: Spacing;
  bold?: boolean;
  truncate?: boolean;
};

export type TypographyProps = BaseTypographyProps & {
  variant?: TextVariant;
  size?: TextSize;
  typography?: never;
};

export type UseTypographyOptions = {
    disabled?: boolean;
}

const defaultProps: TypographyProps = {
  variant: 'body',
  size: 'normal',
  spacing: 'tight',
  bold: false,
  truncate: false,
};

const defaultOptions: UseTypographyOptions = {
  disabled: false,
};

/**
 * Implements the typography classes for a component. It should't be used much, in favor of the
 * `TText` component. However, it can be useful for components that need to apply typography classes
 * to regular HTML elements directly, such as `input` in the `TInput` component.
 */
const useTypography = (
  props: MaybeRefOrGetter<Partial<TypographyProps>>,
  options?: MaybeRefOrGetter<UseTypographyOptions>,
) => {
  const typographyClass = ref<string>('');
  const sizeClass = ref<string>('');
  const weightClass = ref<string>('');
  const spacingClass = ref<string>('');
  const truncateClass = ref<string>('');

  const typographyClasses = ref<string>('');

  const size = ref<TextSize | undefined>(undefined);

  const resetTypography = () => {
    typographyClass.value = '';
    sizeClass.value = '';
    weightClass.value = '';
    spacingClass.value = '';
    truncateClass.value = '';
    typographyClasses.value = '';
    size.value = undefined;
  };

  const updateTypography = () => {
    const {
      disabled,
    } = { ...defaultOptions, ...toValue(options) };
    if (disabled) {
      resetTypography();
      return;
    }
    const {
      variant, size: propSize, truncate,
      spacing, bold,
    } = { ...defaultProps, ...toValue(props) };

    size.value = toValue(propSize) || 'normal';

    typographyClass.value = `tds-font-${toValue(variant)}`;
    // TODO: Check if we need to do this, or if we can just use the value directly with the
    // md modifier for the size
    const tailwindVariant = [toValue(variant), toValue(size)].filter(Boolean).join('-') as keyof TailwindTextVariants;
    const rootSizeClass = `tds-text-${tailwindVariant}`;
    sizeClass.value = `${rootSizeClass} md:${rootSizeClass}-desktop`;
    weightClass.value = `tds-font-${toValue(variant)}-${bold ? 'bold' : 'thin'}`;
    spacingClass.value = spacing ? `tds-tracking-${spacing}` : '';
    truncateClass.value = truncate ? 'tds-truncate' : '';

    typographyClasses.value = [
      typographyClass.value,
      sizeClass.value,
      weightClass.value,
      spacingClass.value,
      truncate ? 'tds-truncate' : '',
    ].join(' ').trim();
  };

  watchEffect(() => updateTypography());

  return {
    typographyClass,
    sizeClass,
    weightClass,
    spacingClass,
    truncateClass,
    size,
    typographyClasses,
  };
};

export default useTypography;
