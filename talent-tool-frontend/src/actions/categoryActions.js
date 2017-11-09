import categoryApi from '../api/categoryApi';
import translationApi from '../api/translationApi';
import * as types from './actionTypes';

export function loadCategories() {
  return function(dispatch) {
    return categoryApi.getAllCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function updateCategory(category) {
  return function (dispatch) {
    return categoryApi.updateCategory(category).then(responseCategory => {
      dispatch(updateCategorySuccess(responseCategory));
      return responseCategory;
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateCategorySuccess(category) {
  return {type: types.UPDATE_CATEGORY_SUCCESS, category}
}

export function createCategory(category) {
  return function (dispatch) {
    return categoryApi.createCategory(category).then(responseCategory => {
      dispatch(createCategorySuccess(responseCategory));
      return responseCategory;
    }).catch(error => {
      throw(error);
    });
  };
}

export function createCategorySuccess(category) {
  return {type: types.CREATE_CATEGORY_SUCCESS, category}
}

export function deleteCategory(category) {
  return function(dispatch) {
    return categoryApi.deleteCategory(category).then(() => {
      console.log(`Deleted ${category.id}`)
      dispatch(deleteCategorySuccess(category));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function deleteCategorySuccess(category) {
  return {type: types.DELETE_CATEGORY_SUCCESS, category}
}

export function createTranslation(translation) {
  return function (dispatch) {
    return translationApi.createTranslation(translation).then(responseTranslation => {
      console.log(`Created new transation`);
      dispatch(createTranslationSuccess(responseTranslation));
      return responseTranslation;
    }).catch(error => {
      throw(error);
    });
  };
}

export function createTranslationSuccess(translation) {
  return {type: types.CREATE_TRANSLATION_SUCCESS, translation}
}

export function updateTranslation(translation) {
  return function (dispatch) {
    return translationApi.updateTranslation(translation).then(responseTranslation => {
      console.log(`updated transation`);
      dispatch(updateTranslationSuccess(responseTranslation));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateTranslationSuccess(translation) {
  return {type: types.UPDATE_TRANSLATION_SUCCESS, translation}
}

export function deleteTranslation(translation) {
  return function(dispatch) {
    return translationApi.deleteTranslation(translation).then(() => {
      console.log(`Deleted ${translation.id}`)
      dispatch(deleteTranslationSuccess(translation));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function deleteTranslationSuccess(translation) {
  return {type: types.DELETE_TRANSLATION_SUCCESS, translation}
}
