export const RULES_BASE_PATH = '/rules';

export function rulesPath(segment = '') {
  if (!segment) {
    return RULES_BASE_PATH;
  }

  return `${RULES_BASE_PATH}/${segment.replace(/^\//, '')}`;
}

export const RULES_ASSETS_BASE = `${import.meta.env.BASE_URL}rules/`;
