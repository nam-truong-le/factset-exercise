// for when you don't specify quasar.conf.js > framework: 'all'
import { Quasar } from 'quasar';
import { getLangIso } from 'assets/utils';
// OTHERWISE:
// import Quasar from 'quasar'

require('numeral/locales');

export default async () => {
  const langIso = getLangIso();
  console.log(`boot with language: ${langIso}`);

  try {
    await import(
      /* webpackInclude: /(de|en-us)\.js$/ */
      'quasar/lang/' + langIso
    )
      .then(lang => {
        Quasar.lang.set(lang.default);
      });
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
};
