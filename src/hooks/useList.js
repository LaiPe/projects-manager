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
                list: [...state.list, { ...action.payload, id: state.nextId }],
                nextId: state.nextId + 1
            };
        default:
            return state;
    }
}

function useList(initialItems, lastUsedId) {
    const [state, dispatch] = useReducer(
        listReducer,
        {
            nextId: lastUsedId + 1 || initialItems.length + 1,
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