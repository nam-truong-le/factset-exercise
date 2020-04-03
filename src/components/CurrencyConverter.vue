<template>
  <div>
    <div class="text-grey-9"><span class="text-secondary">{{toLocaleNumber(amountToUse)}}</span> {{getCurrencyName(fromCurrencyToUse)}} {{$t('equals')}}</div>
    <div class="text-h4"><span class="text-primary">{{toLocaleNumber(result)}}</span> {{getCurrencyName(toCurrencyToUse)}}</div>
    <div class="text-grey-9">{{$t('updated')}}: <span class="text-black">{{lastUpdate}}</span></div>
    <div class="row q-mt-md q-gutter-sm">
      <q-input outlined style="width: 10rem;" v-model="amountInput" :rules="[validateInput]"/>
      <q-select outlined style="width: 15rem;" :options="currencies" v-model="fromInput" @input="updateFrom" :rules="[]"/>
    </div>
    <div class="row q-gutter-sm">
      <q-input outlined style="width: 10rem;" readonly :value="toLocaleNumber(result)"/>
      <q-select outlined style="width: 15rem;" :options="currencies" v-model="toInput" @input="updateTo"/>
    </div>
  </div>
</template>

<script>

import * as CC from 'currency-codes';
import * as moment from 'moment';
import * as _ from 'lodash';
import { RATES_CONFIG, CURRENCIES } from '../assets/rates';
import * as numeral from 'numeral';
import * as parseDecimalNumber from 'parse-decimal-number';
import { getLangIso } from '../assets/utils';

const DEFAULT_AMOUNT = 1;

export default {
  name: 'ComponentCurrencyConverter',
  props: ['value', 'currencies', 'rates'],
  data () {
    return {
      amountInput: '',
      toInput: null,
      fromInput: null
    };
  },
  mounted () {
    this.amountInput = this.toLocaleNumber(this.amountToUse);
    this.fromInput = this.getCurrency(this.fromCurrencyToUse);
    this.toInput = this.getCurrency(this.toCurrencyToUse);
    this.$emit('input', {
      amount: this.amountToUse,
      from: this.fromCurrencyToUse,
      to: this.toCurrencyToUse
    });
  },
  computed: {
    currenciesToUse () {
      return this.currencies || CURRENCIES;
    },
    ratesToUse () {
      return this.rates || RATES_CONFIG;
    },
    fromCurrencyToUse () {
      return (this.value && this.value.from) || this.currenciesToUse[0].value;
    },
    toCurrencyToUse () {
      return (this.value && this.value.to) || this.currenciesToUse[1].value;
    },
    amountToUse () {
      return Number.isFinite(this.value && this.value.amount) ? this.value.amount : DEFAULT_AMOUNT;
    },
    lastUpdate () {
      return moment(new Date(this.ratesToUse.timestamp)).toString();
    },
    result () {
      return _.round(this.amountToUse / this.ratesToUse.rates[this.fromCurrencyToUse] * this.ratesToUse.rates[this.toCurrencyToUse], 2);
    }
  },
  methods: {
    getCurrencyName (currencyCode) {
      return CC.code(currencyCode).currency;
    },
    getCurrency (currencyCode) {
      return CURRENCIES.find(c => c.value === currencyCode);
    },
    toLocaleNumber (number) {
      return number.toLocaleString(this.$q.lang.getLocale());
    },
    validateInput (s) {
      const amount = parseDecimalNumber(s, numeral.localeData(getLangIso()).delimiters);
      if (Number.isFinite(amount)) {
        this.$emit('input', _.merge({}, this.value, { amount }));
        return true;
      }
      this.$emit('input', _.merge({}, this.value, { amount: null }));
      return this.$t('wrongNumberFormat');
    },
    updateFrom (val) {
      this.$emit('input', _.merge({}, this.value, { from: val.value }));
    },
    updateTo (val) {
      this.$emit('input', _.merge({}, this.value, { to: val.value }));
    }
  }
};
</script>
