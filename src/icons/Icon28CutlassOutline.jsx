import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Сундук снаряжения — инвентарь и предметы */
export function Icon28CutlassOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="cutlass_outline_28"
      vkuiAttrs={{ fill: 'currentColor' }}
      vkuiProps={props}
    >
      <path d="M5 11.5h18v9A3.5 3.5 0 0 1 19.5 24h-11A3.5 3.5 0 0 1 5 20.5v-9z" />
      <path d="M7 9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2.5h-2V9a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2.5H7V9z" />
      <rect x="5" y="13.5" width="18" height="2" fill="white" opacity="0.3" />
      <rect x="12" y="15.2" width="4" height="3.8" rx="1" fill="white" opacity="0.95" />
    </SvgIconRootV2>
  );
}
