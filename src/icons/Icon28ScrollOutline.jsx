import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Свиток правил — морской устав / договор */
export function Icon28ScrollOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="scroll_outline_28"
      vkuiAttrs={{ fill: 'currentColor' }}
      vkuiProps={props}
    >
      <path d="M9 4h10a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H11a6 6 0 0 1-6-6V8a4 4 0 0 1 4-4z" />
      <rect x="10.5" y="9.5" width="9" height="1.8" rx="0.9" fill="white" opacity="0.95" />
      <rect x="10.5" y="13.5" width="9" height="1.8" rx="0.9" fill="white" opacity="0.95" />
      <rect x="10.5" y="17.5" width="6.5" height="1.8" rx="0.9" fill="white" opacity="0.95" />
      <circle cx="7.5" cy="10" r="1.4" fill="white" opacity="0.9" />
    </SvgIconRootV2>
  );
}
