const initialState = {
  editors: []
}

const unSelectEditor = e => ({ ...e, selected: false })
const findByFileName = fileName => editor => editor.fileName === fileName;

export default (state = initialState, action) => {
  switch(action.type) {
    case "SCRIPT_DELETED": {
      const { fileName } = action.payload;

      // We need to check if the script deleted, if the one opened
      const selectedEditor = state.editors.find(e => e.fileName === fileName);

      return {
        ...state,
        editors: state.editors
          .filter(e => e.fileName !== fileName)
          .map((e, idx) => ({
            ...e,
            selected: (selectedEditor.fileName === fileName && idx === 0) || e.selected
          }))
      }
    }
    case "SCRIPT_SAVED":
    case "SCRIPT_CHANGE": {
      const { fileName } = action.payload;

      return {
        ...state,
        editors: state.editors.map(editor => {
          if (editor.type === "SCRIPT" && editor.fileName === fileName) {
            return {
              ...editor,
              modified: action.type === 'SCRIPT_CHANGE'
            }
          }

          return editor;
        })
      }
    }
    case "CLOSE_EDITOR": {
      const { fileName } = action.payload;

      // TODO check if tab has modifications (maybe not here?)
      const newState = {
        ...state,
        editors: state.editors.filter(editor => editor.fileName !== fileName)
      }

      // Check if there is one editor open
      const isOpen = newState.editors.find(findByFileName(fileName));

      if (!isOpen && newState.editors.length) {
        newState.editors[0].selected = true;
      }

      return newState;
    }
    case "OPEN_EDITOR": {
      const { type, fileName } = action.payload;

      // Check if the editor is already open
      const isOpen = state.editors.find(findByFileName(fileName));

      if (isOpen) {
        // Just select the editor
        return {
          ...state,
          editors: state.editors.map(e => ({
            ...e,
              selected: e.fileName === fileName,
          }))
        }
      }

      // Otherwise open a new one
      return {
        ...state,
        editors: [
          ...state.editors.map(unSelectEditor),
          { type, fileName, selected: true, modified: false }
        ]
      }
    }
  }
  return state;
}
