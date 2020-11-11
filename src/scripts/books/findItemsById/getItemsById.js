export { getAuthorById, getCategoryById };
import { authorsArr, categoriesArr } from '../../common/index';

export let categId1 = 1;
export let categId2 = 2;

const getAuthorById = id => authorsArr.find(author => author.id === id).name;

const getCategoryById = id => categoriesArr.find(category => category.id === id).title;
