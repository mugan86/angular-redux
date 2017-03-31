export const campaigns = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'ADD_CAMPAIGNS':
            console.log(payload);
            return payload;
        case 'ADD_STATIC':
            return state.concat(payload);
        case 'REMOVE_ELEMENT':
            return state.filter(campaign => {
                return campaign.token !== payload[0].token;})
        case 'CREATE_CAMPAIGN': 
            return [...state, payload];
        case 'UPDATE_CAMPAIGN':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_CAMPAIGN': 
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default: 
            return state;
    }
}