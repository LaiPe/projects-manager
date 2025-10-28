import { useCallback, useReducer } from 'react';

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

    return {
        list: state.list,
        deleteItem: useCallback(
            item => dispatch({ type: 'DELETE_ITEM', payload: item.id }),
            []
        ),
        addItem: useCallback(
            item => dispatch({ type: 'ADD_ITEM', payload: item }),
             []
        )
    }
}

export default useList;