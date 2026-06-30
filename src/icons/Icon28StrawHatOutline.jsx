import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Соломенная шляпа — символ приключения */
export function Icon28StrawHatOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="straw_hat_outline_28"
      vkuiAttrs={{ fill: 'currentColor' }}
      vkuiProps={props}
    >
      <path d="M4 15.5c0-4.5 4.5-8 10-8s10 3.5 10 8v1.5H4V15.5z" />
      <path d="M6.5 17h15v2.5c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2V17z" />
      <path d="M12.5 11.5h3v2.5h-3v-2.5z" />
      <path d="M5 15.5c2-2.5 5.5-4 9-4s7 1.5 9 4H5z" opacity="0.35" />
    </SvgIconRootV2>
  );
}
