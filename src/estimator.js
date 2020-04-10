const formatTimeToDays = ({ timeToElapse, periodType = 'days' }) => {
  if (periodType === 'months') {
    return timeToElapse * 30;
  }
  if (periodType === 'weeks') {
    return timeToElapse * 7;
  }
  return timeToElapse;
};

const calculateImpact = ({ region, ...input }, magnitude = 1) => {
  const days = formatTimeToDays(input);
  const timeFactor = Math.trunc(days / 3);

  const currentlyInfected = input.reportedCases * 10 * magnitude;
  const infectionsByRequestedTime = currentlyInfected * (2 ** timeFactor);

  return {
    currentlyInfected,
    infectionsByRequestedTime
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: calculateImpact(data),
  severeImpact: calculateImpact(data, 5)
});

export default covid19ImpactEstimator;
