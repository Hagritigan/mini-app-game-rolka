/** Заглушка в public, если нет файла по gid */
export const SHEET_IMAGE_PLACEHOLDER_URL = '/111.png';

/** Имя файла в public совпадает с gid листа: /0.png, /702163774.png */
export function getSheetImageUrl(gid) {
  return `/${gid}.png`;
}
