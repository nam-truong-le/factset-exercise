<template>
  <q-page class="flex flex-center">
    <div class="column">

      <h6>With predefined values</h6>
      <currency-converter :currencies="CURRENCIES" :rates="RATES_CONFIG" v-model="converter1" class="q-mb-xl"/>
      <div>Data model:</div>
      <pre>{{JSON.stringify(converter1, null, 2)}}</pre>

      <h6>With standard values</h6>
      <currency-converter v-model="converter2" class="q-mb-xl"/>
      <div>Data model:</div>
      <pre>{{JSON.stringify(converter2, null, 2)}}</pre>
    </div>
  </q-page>
</template>

<script>

import CurrencyConverter from '../components/CurrencyConverter';
import { CURRENCIES, RATES_CONFIG } from '../assets/rates';

export default {
  name: 'PageIndex',
  data () {
    return {
      converter1: {
        amount: 2345678.54,
        from: 'VND',
        to: 'EUR'
      },
      converter2: {},
      CURRENCIES,
      RATES_CONFIG
    };
  },
  components: {
    'currency-converter': CurrencyConverter
  }
};
</script>
