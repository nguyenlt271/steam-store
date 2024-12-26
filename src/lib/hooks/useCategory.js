const CategoryContext = React.createContext();

export const useCategory = () => {
  const context = React.useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within an ActionsProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [actions, setActions] = React.useState({
    categories: []
  });

  const updateAction = (key, value) => {
    setActions((prev) => ({ ...prev, [key]: value }));
  };

  const onGetCategories = (categories) => {
    updateAction('categories', categories);
  };

  return (
    <CategoryContext.Provider
      value={{
        state: actions,
        actions: {
          onGetCategories
        }
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.any
};
