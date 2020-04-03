import { Quasar } from 'quasar';

export function getLangIso () {
  const lang = Quasar.lang.getLocale();
  if (lang.includes('-')) {
    return lang.split('-')[0];
  }
  return lang;
}
