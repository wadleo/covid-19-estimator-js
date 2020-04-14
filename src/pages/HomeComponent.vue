<template>
  <home class="home" :class="{'nores': !report}">
    <form @submit.stop.prevent="estimate" class="form">
      <h2>A Simple Covid-19 Estimator</h2>
      <h5>Get a rough estimation of expected effects of Covid-19 in your country</h5>

      <div class="form-input">
        <label for="population">Estimated Current Population</label>
        <input
          type="number"
          min="0"
          class="input"
          id="population"
          data-population="data-population"
          v-model="formData.population"
          required="true"
        />
      </div>

      <div class="form-input">
        <label for="totalHospitalBeds">Estimated Number of Hospital Beds</label>
        <input
          type="number"
          min="0"
          class="input"
          id="totalHospitalBeds"
          data-total-hospital-beds="data-total-hospital-beds"
          v-model="formData.totalHospitalBeds"
          required="true"
        />
      </div>

      <div class="form-input">
        <label for="periodType">Estimation Period Type</label>
        <select
          name="periodType"
          class="input"
          v-model="formData.periodType"
          data-period-type="data-period-type"
          required="true"
          id="periodType"
        >
          <option v-for="type in periodTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
        </select>
      </div>

      <div class="form-input">
        <label for="timeToElapse">Number of {{ formData.periodType }} to estimate for</label>
        <input
          type="number"
          min="0"
          class="input"
          data-time-to-elapse="data-time-to-elapse"
          id="timeToElapse"
          v-model="formData.timeToElapse"
          required="true"
        />
      </div>

      <div class="form-input">
        <label for="reportedCases">Currently Reported Cases</label>
        <input
          type="number"
          min="0"
          class="input"
          data-reported-cases="data-reported-cases"
          v-model="formData.reportedCases"
          required="true"
          id="reportedCases"
        />
      </div>
      <button class="submit" data-go-estimate="data-go-estimate">Calculate</button>
    </form>

    <transition name="results">
      <div class="results" v-if="report">
        <i class="close" @click="report=null">Reset</i>
        <result-comp :report="report.impact" :input="formData" class="impact" title="Estimated Impact" />
        <result-comp
          :report="report.severeImpact"
          :input="formData"
          class="severe-impact"
          title="Estimated Severe Impact (x5)"
          sub-title="According to Harvard Medical School / Massachusetts General Hospital"
        />
      </div>
    </transition>
  </home>
</template>
<script>
import ResultComponent from './ResultComponent';
import estimate from '../estimator';
export default {
  components: {'result-comp': ResultComponent},
  data() {
    return {
      formData: {
        region: {
          name: 'Africa',
          avgAge: 19.7,
          avgDailyIncomeInUSD: 5,
          avgDailyIncomePopulation: 0.71
        },
        periodType: 'days',
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
      },
      periodTypes: [
        {
          label: 'Days',
          value: 'days'
        },
        {
          label: 'Weeks',
          value: 'weeks'
        },
        {
          label: 'Months',
          value: 'months'
        }
      ],
      report: null
    };
  },
  methods: {
    estimate() {
      this.report = estimate(this.formData);
    }
  }
};
</script>
<style scoped>
  .home {
    margin: auto;
    display: flex;
    padding: 10px;
    min-width: 700px;
    min-height: 400px;
    border-radius: 5px;
    align-content: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    background-color: white;
    transition: max-height 0.5s ease-out;
    box-shadow: 0 0 5px 3px rgba(139, 122, 122, 0.1);
  }

  .home.nores {
    max-height: 600px;
  }

  h2 {
    font-size: 25px;
  }

  h5 {
    font-size: 18px;
  }

  .form {
    margin: auto;
    max-width: 500px;
  }

  .results {
    max-width: 500px;
    margin: auto;
  }

  .results {
    padding: 20px 0;
  }

  .form-input {
    display: flex;
    padding: 5px 0;
    align-items: center;
    justify-content: start;
  }

  .form-input label {
    width: 70%;
    font-size: 18px;
  }

  button {
    padding: 5px;
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
    background: #bb5f5f;
  }

  i {
    float: right;
    padding: 5px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    background: #bb5f5f;
  }
</style>