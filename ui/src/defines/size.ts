/*
 * CSS size 정의를 위한 타입
 */

type PositionProperty = 'top' | 'bottom' | 'left' | 'right';

type SpaceProperty = 'padding' | 'margin';

export type SizeProperty = 'width' | 'height' | PositionProperty | `${SpaceProperty}-${PositionProperty}` | 'border-radius';

export type Size = number | `${number}px` | `${number}%` | `${number}rem` | `${number}em`;

export type SizeCss = `${SizeProperty}: ${Exclude<Size, number>};` | '';
