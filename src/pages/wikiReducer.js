const initialState = {
    searchResults : []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WIKI':
            console.log(action.payload)
            return { ...state, searchResults: action.payload}
        default: return state;
    }
}