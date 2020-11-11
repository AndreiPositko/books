export { getAuthorById, getCategoryById };
import { authorsArr, categoriesArr } from '../../common/index';


const getAuthorById = id => authorsArr.find(author => author.id === id).name;

const getCategoryById = id => categoriesArr.find(category => category.id === id).title;
