const formatTimeToDays = ({ timeToElapse, periodType = 'days' }) => {
  let days;
  switch (periodType) {
    case 'months':
      days = timeToElapse * 30;
      break;
    case 'weeks':
      days = timeToElapse * 7;
      break;
    default:
      days = timeToElapse;
      break;
  }
  return days;
};

const calculateImpact = ({ region, ...input }, magnitude = 1) => {
  const days = formatTimeToDays(input);
  const timeFactor = Math.trunc(days / 3);

  const currentlyInfected = input.reportedCases * 10 * magnitude;
  const infectionsByRequestedTime = currentlyInfected * (2 ** timeFactor);

  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const hospitalBedsByRequestedTime = Math.ceil(input.totalHospitalBeds * 0.35)
    - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime * region.avgDailyIncomeInUSD
    * region.avgDailyIncomePopulation) / days);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateImpact(data, 5)
});

export default covid19ImpactEstimator;
