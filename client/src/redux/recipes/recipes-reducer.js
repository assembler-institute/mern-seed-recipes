import RecipesTypes from "./recipes-types";

const RecipesInitialState = {
  recipesLoading: false,
  recipesLoadingError: null,
  recipesFetched: false,
  recipeLoading: false,
  recipeLoadingError: null,
  recipeFetched: false,
  recipeUpdating: false,
  recipeUpdatingError: null,
  byID: {},
  ids: [],
};

function RecipesReducer(state = RecipesInitialState, action) {
  switch (action.type) {
    case RecipesTypes.FETCH_RECIPES_REQUEST: {
      return {
        ...state,
        recipesLoading: true,
        recipesLoadingError: null,
      };
    }
    case RecipesTypes.FETCH_RECIPES_ERROR: {
      return {
        ...state,
        recipesLoading: false,
        recipesLoadingError: action.payload,
      };
    }
    case RecipesTypes.FETCH_RECIPES_SUCCESS: {
      return {
        ...state,
        recipesLoading: false,
        recipesFetched: true,
        recipesLoadingError: null,
        byID: action.payload.byID,
        ids: action.payload.ids,
      };
    }
    case RecipesTypes.FETCH_RECIPE_REQUEST: {
      return {
        ...state,
        recipeLoading: true,
        recipeLoadingError: null,
        recipeUpdatingError: null,
      };
    }
    case RecipesTypes.FETCH_RECIPE_ERROR: {
      return {
        ...state,
        recipeLoading: false,
        recipeLoadingError: action.payload,
      };
    }
    case RecipesTypes.FETCH_RECIPE_SUCCESS: {
      const recipeID = action.payload._id;

      return {
        ...state,
        recipeLoading: false,
        recipeFetched: true,
        recipeLoadingError: null,
        byID: {
          ...state.byID,
          [recipeID]: {
            ...state.byID[recipeID],
            comments: [...action.payload.comments],
            author: {
              ...action.payload.author,
            },
            ingredients: [...action.payload.ingredients],
          },
        },
      };
    }
    case RecipesTypes.RECIPE_UPDATING: {
      return {
        ...state,
        recipeUpdating: true,
        recipeUpdatingError: null,
      };
    }
    case RecipesTypes.RECIPE_UPDATING_ERROR: {
      return {
        ...state,
        recipeUpdatingError: action.payload,
      };
    }
    case RecipesTypes.ADD_LOCAL_RECIPE_COMMENT: {
      const recipeID = action.payload.recipeID;
      const newComment = action.payload.comment;

      return {
        ...state,
        byID: {
          ...state.byID,
          [recipeID]: {
            ...state.byID[recipeID],
            comments: [newComment, ...state.byID[recipeID].comments],
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default RecipesReducer;
