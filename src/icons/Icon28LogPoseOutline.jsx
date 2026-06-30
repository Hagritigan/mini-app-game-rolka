import { SvgIconRootV2 } from '@vkontakte/icons-sprite';

/** Лог-поз — компас для навигации по Гранд Лайну */
export function Icon28LogPoseOutline(props) {
  return (
    <SvgIconRootV2
      viewBox="0 0 28 28"
      width={28}
      height={28}
      vkuiIconId="log_pose_outline_28"
      vkuiAttrs={{ fill: 'currentColor' }}
      vkuiProps={props}
    >
      <path d="M14 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
      <circle cx="14" cy="13" r="6.2" fill="white" opacity="0.95" />
      <path d="M14 8.5 17.8 13 14 17.5 10.2 13 14 8.5z" />
      <circle cx="14" cy="13" r="1.6" fill="white" />
      <rect x="10" y="23" width="8" height="2" rx="1" />
    </SvgIconRootV2>
  );
}
