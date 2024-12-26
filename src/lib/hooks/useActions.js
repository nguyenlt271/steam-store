import React from 'react';
import PropTypes from 'prop-types';

const ActionsContext = React.createContext();

export const useActions = () => {
  const context = React.useContext(ActionsContext);
  if (!context) {
    throw new Error('useActions must be used within an ActionsProvider');
  }
  return context;
};

export const ActionsProvider = ({ children }) => {
  const [actions, setActions] = React.useState({
    target: null,
    selectedIds: [],
    openForm: false,
    openDelete: false,
    saving: false,
    loading: false,
    meta: {}
  });

  const updateAction = (key, value) => {
    setActions((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeMeta = (obj) => {
    setActions((prev) => ({ ...prev, meta: { ...prev.meta, ...obj } }));
  };

  const resetMeta = () => {
    setActions((prev) => ({ ...prev, meta: {} }));
  };

  const onOpenDeleted = (ids) => {
    updateAction('selectedIds', ids);
    updateAction('openDelete', true);
  };

  const onCloseDeleted = () => {
    updateAction('selectedIds', []);
    updateAction('openDelete', false);
  };

  const onOpenForm = (target = null) => {
    updateAction('target', target);
    updateAction('openForm', true);
  };

  const onCloseForm = () => {
    updateAction('target', null);
    updateAction('openForm', false);
  };

  const onChangeTarget = (target) => {
    updateAction('target', target);
  };

  const onLoadingStart = () => {
    updateAction('loading', true);
  };

  const onLoadingEnd = () => {
    updateAction('loading', false);
  };

  const onSavingStart = () => {
    updateAction('saving', true);
  };

  const onSavingEnd = () => {
    updateAction('saving', false);
  };

  return (
    <ActionsContext.Provider
      value={{
        state: actions,
        actions: {
          onOpenForm,
          onOpenDeleted,
          onCloseForm,
          onCloseDeleted,
          onLoadingStart,
          onLoadingEnd,
          onSavingStart,
          onSavingEnd,
          onChangeMeta,
          onChangeTarget,
          resetMeta
        }
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};

ActionsProvider.propTypes = {
  children: PropTypes.any
};
