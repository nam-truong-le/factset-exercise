export function getLangIso () {
  const lang = window.navigator.language;
  if (lang.includes('-')) {
    return lang.split('-')[0];
  }
  return lang;
}

export function getLangLong () {
  return window.navigator.language;
}
