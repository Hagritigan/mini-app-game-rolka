import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Меч 28×28 — в наборе VK Icons отдельной иконки нет */
export function Icon28SwordOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="sword_outline_28"
      vkuiAttrs={{ fill: 'currentColor' }}
      vkuiProps={props}
    >
      <path d="M14 2 16.15 13.75H11.85L14 2Z" />
      <path d="M5.5 13.5h17v3H5.5v-3Z" />
      <path d="M12 16.5h4v5.5h-4V16.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 22h7a2 2 0 1 1 0 4h-7a2 2 0 1 1 0-4Z"
      />
    </SvgIconRootV2>
  );
}
