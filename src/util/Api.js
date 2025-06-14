export const getCurrentYearApiCall = (url,user,starts,ends) => {
  let callForCurrentYear= '';

  if (user.siteId) {
    callForCurrentYear = url + 'climateImpactBySite/' +
    user.siteId + 
    '?startDate=' + starts + 
    '&endDate=' + ends + 
    '&productionEmissionsMultiplier=' + 5 +  
    '&tareWeight=20';
  } else if (user.userId) {
    callForCurrentYear = url + 'climateImpactByUser/' +
    user.userId + 
    '?startDate=' + starts + 
    '&endDate=' + ends + 
    '&tareWeight=20'; 
  }
  return callForCurrentYear;
}

export const getCurrentMonthApiCall = (url,user,starts,ends) => {
  let callForCurrentMonth= '';
  if (user.siteId) {
    callForCurrentMonth = url + 'climateImpactBySite/' +
    user.siteId + 
    '?startDate=' + starts + 
    '&endDate=' + ends + 
    '&productionEmissionsMultiplier=' + 5 +
    '&tareWeight=20';
  } else if (user.userId) {
    callForCurrentMonth = url + 'climateImpactByUser/' +
    user.userId + 
    '?startDate=' + starts + 
    '&endDate=' + ends + 
    '&productionEmissionsMultiplier=' + 5 +
    '&tareWeight=20'; 
  }
  return callForCurrentMonth;
}