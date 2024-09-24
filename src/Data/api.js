// const baseURL = `http://localhost:5580/`;
// const baseURL = `http://192.168.1.31:5580/`;
// const baseURL=`http://192.168.43.218:5580/`;
// const baseURL=`http://192.168.1.11:9090/`;
const baseURL=`https://dashboard.wheel2fortune.com/`;
// const baseURL = `/`;
export { baseURL };

const msiApi = `${baseURL}mis`;
export { msiApi };

const specificApi = `${baseURL}api/fetch-mis/specific`;
export {specificApi};

const checkingLogs = `${baseURL}api/fetch-mis`
export {checkingLogs}

const CheckHourlyLogsApi =`${baseURL}api/fetch-hourly-logs`
export {CheckHourlyLogsApi}

const CheckDailyBillingLogsApi =`${baseURL}api/fetch-billing-logs`
export {CheckDailyBillingLogsApi}
const SubscriptionApi = `${baseURL}api/upload/sub`
export {SubscriptionApi}
const SubscriptionBaseInfoApi =`${baseURL}api/upload/sub/base-info`
export {SubscriptionBaseInfoApi}
const UnSubscriptionApi =`${baseURL}api/upload/unsub`
export {UnSubscriptionApi}
const UnsubSingleUSer =`${baseURL}api/upload/unsub/single`
export {UnsubSingleUSer}
const SingleDNDSpecificLogs =`${baseURL}api/fetch-mis/specific-dnd`
export {SingleDNDSpecificLogs}
const DrawWinnerlogs =`https://www.wheelbackend.wheel2fortune.com/drawData`
export {DrawWinnerlogs}
const SendDrawData =`https://www.wheelbackend.wheel2fortune.com/sendPrize`
export {SendDrawData}