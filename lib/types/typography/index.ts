export interface HTMLTextElementTagMap {
    h1: HTMLHeadingElement;
    h2: HTMLHeadingElement;
    h3: HTMLHeadingElement;
    h4: HTMLHeadingElement;
    h5: HTMLHeadingElement;
    h6: HTMLHeadingElement;
    p: HTMLParagraphElement;
    span: HTMLSpanElement;
  }  
export const textTagOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
export type TextTag = keyof HTMLTextElementTagMap;

export const textVariantOptions = ['display', 'body', 'link'] as const;
export type TextVariant = typeof textVariantOptions[number];

export const basicSizeOptions = ['2x-small', 'x-small', 'small', 'normal', 'large', 'x-large', '2x-large'] as const;
export type TextSize = typeof basicSizeOptions[number];

export const textSpacingOptions = ['tight', 'spread', 'loose'] as const;
export type Spacing = 'tight' | 'spread' | 'loose';

type TailwindVariantDefinition = TextVariant | `${TextVariant}-${TextSize}` | `${TextVariant}-${TextSize}-desktop`;

type TailwindFontFamilyValue = string
| string[]
| [
    fontFamily: string | string[],
    configuration: Partial<{
      fontFeatureSettings: string
      fontVariationSettings: string
    }>
  ]

export type TailwindTextVariants = Record<TailwindVariantDefinition, TailwindFontFamilyValue>;
