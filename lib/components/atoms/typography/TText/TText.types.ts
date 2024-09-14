import type { HTMLAttributes } from 'vue';

import type { TypographyProps } from '@/composables/typography/useTypography';
import type { TextTag } from '@/types/typography';
import type { ClassValue } from 'clsx';

export interface TTextProps extends /* @vue-ignore */ Partial<HTMLAttributes>, TypographyProps
  {
  /**
   * The HTML tag to use for the `TText` component. Default is `p`.
   */
  tag?: TextTag;
  /**
   * The text to display in the `TText` component.
   */
  text?: string;
  /**
   * Class names to apply to the `TText` component.
   */
  className?: ClassValue;
  /**
   * Display size has been deprecated. Use `size` instead.
   *
   * Note that for homologation purposes, all fonts now use the same size scale, which conflicts
   * with the previous display size scale. This prop will be removed in the future.
   *
   * @example
   * ```vue
   * <TText variant="display" displaySize="small" />
   *
   * <!-- Use size instead -->
   *
   * <TText variant="display" size="small" />
   * ```
   */
  displaySize?: never
  /**
   * bodySize has been deprecated. Use `size` instead.
   *
   * @example
   * ```vue
   * <TText variant="body" bodySize="small" />
   *
   * <!-- Use typography.size instead -->
   *
   * <TText variant="body" size="small" />
   * ```
   */
  bodySize?: never
  /**
   * linkSize has been deprecated. Use `size` instead.
   *
   * @example
   * ```vue
   * <TText variant="link" linkSize="small" />
   *
   * <!-- Use size instead -->
   *
   * <TText variant="link" size="small" />
   * ```
   */
  linkSize?: never
}

export type TTextSlot = {
  text: string;
};
