import * as types from './mutations-types'

export default {
    [types.UPDATE_LOADING_STATUS]: (state, isLoading) => {
        state.isLoading = isLoading
    },
    setUrl: (state, msg) => {
        state.setUrl = msg
    },
}
