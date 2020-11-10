export { getAuthorById, getCategoryById };
export { authorServer, categoryServer };

const authorServer = `http://localhost:3004/authors`;
const categoryServer = `http://localhost:3004/categories`;

const getAuthorById = async (id) => {
  const authorIdPromise = await fetch(authorServer);
  const json = await authorIdPromise.json();
  const responseAuthor = json.find(author => author.id === id).name;
  return responseAuthor;
};

/** Get category by ID */

const getCategoryById = async (id) => {
  const categoryIdPromise = await fetch(categoryServer);
  const json = await categoryIdPromise.json();
  const responseCategory = json.find(category => category.id === id).title;
  return responseCategory;
};
