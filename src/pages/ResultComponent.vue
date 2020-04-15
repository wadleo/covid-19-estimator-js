<template>
  <div class="result">
    <h3>{{title}}</h3>
    <h5>{{subTitle}}</h5>
    <div class="output">
      <div class="data">
        <label>Currently Infected</label>
        <p class="value">{{report.currentlyInfected}}</p>
      </div>
      <div class="data">
        <label>Estimated infections in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.infectionsByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be hospitalised in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.severeCasesByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Number of hospital beds available in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.hospitalBedsByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be in the ICU in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.casesForICUByRequestedTime}}</p>
      </div>
      <div class="data">
        <label>Cases that might be on ventilators in {{input.timeToElapse}} {{input.periodType}}</label>
        <p class="value">{{report.casesForVentilatorsByRequestedTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    report: Object,
    input: Object
  }
}
</script>

<style scoped>
  h3 {
    font-size: 22px;
  }

  h5 {
    margin: 5px 0;
    font-size: 18px;
  }

  .result {
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }

  .data {
    display: flex;
    padding: 5px 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .data label {
    font-size: 18px;
    font-weight: 500;
    margin-right: 25px;
  }
</style>
