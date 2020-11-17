import { takeLatest, call, put } from 'redux-saga/effects';
import ActionTypes from 'containers/HomePage/constants';
import { fetchBitcoinPricesSuccess, fetchBitcoinPricesRejected } from 'containers/HomePage/actions';
import request from 'utils/request';
import config from 'config';

/**
 * Fetch Bitcoin price
 */
export function* fetchBitcoinPrice() {
    try {
        // Call our request helper (see 'utils/request')
        const requestURL = `${config.COIN_DESK_BITCOIN_PRICE_URL}?`;
        const bitcoinPrices = yield call(request, requestURL);
        yield put(fetchBitcoinPricesSuccess(bitcoinPrices));
    } catch (err) {
        yield put(fetchBitcoinPricesRejected(err));
    }
}

// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(ActionTypes.FETCH_BITCOIN_PRICES, fetchBitcoinPrice);
}