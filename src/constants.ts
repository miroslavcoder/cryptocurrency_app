export enum Constants {
  API_BASE_URL = "https://min-api.cryptocompare.com/data",
  IMG_PATH = "https://www.cryptocompare.com",

}
export const localCurrencies: string[] = [ "USD", "GBP", "EUR", "JPY", "KRW"];

export enum Status {
  NOT_LOADED = "NOT_LOADED",
  LOAD_SUCCESS = "LOAD_SUCCESS",
  LOADING = "LOADING",
  LOAD_FAIL = "LOAD_FAIL"
}
