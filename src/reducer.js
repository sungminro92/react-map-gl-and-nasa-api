export default function reducer(state, action) {
    switch (action.type) {
        case "SetCategories":
            return {
                ...state,
                categories: [
                    ...state.categories,
                    {
                        title: action.title,
                        id: action.id,
                        hasEvents: action.hasEvents,
                        numOfEvents: action.numOfEvents
                    }
                ]
            };
        case "SetActiveCategory":
            return {
                ...state,
                activeCategory: action.value
            };
        default:
            return state;
    }
}
