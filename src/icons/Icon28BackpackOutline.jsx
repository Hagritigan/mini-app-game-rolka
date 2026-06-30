import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Рюкзак 28x28 — лучше подходит для раздела снаряжения */
export function Icon28BackpackOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="backpack_outline_28"
      vkuiAttrs={{ fill: 'none', stroke: 'currentColor' }}
      vkuiProps={props}
    >
      <path
        d="M10.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="6" y="8.5" width="16" height="15" rx="4" strokeWidth="2" />
      <path d="M6 14h16" strokeWidth="2" strokeLinecap="round" />
      <rect x="11.2" y="15.6" width="5.6" height="4.6" rx="1.2" strokeWidth="2" />
      <path d="M9.5 11.5h2M16.5 11.5h2" strokeWidth="2" strokeLinecap="round" />
    </SvgIconRootV2>
  );
}
