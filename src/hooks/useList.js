import { useReducer, useMemo } from 'react';

function listReducer(state, action) {
    switch (action.type) {
        case 'DELETE_ITEM':
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload)
            };
        case 'ADD_ITEM':
            return {
                ...state,
                list: [...state.list, action.payload]
            };
        default:
            return state;
    }
}

function useList(initialItems) {
    const [state, dispatch] = useReducer(
        listReducer,
        { 
            list: [...initialItems]
        }
    );

    const dispatchMethods = useMemo(() => ({
        deleteItem: (item) => dispatch({ type: 'DELETE_ITEM', payload: item.id }),
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),

    }), []);

    return {
        list: state.list,
        dispatchMethods
    };
}

export default useList;