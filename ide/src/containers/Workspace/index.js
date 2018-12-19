import { connect } from "react-redux";
import Workspace from "../../components/Workspace";

const getSelectedEditor = (editors, scripts, sprites) => {
  const selectedEditor = editors.find(e => e.selected);

  if (selectedEditor) {
    let content;
    if (selectedEditor.type === "SCRIPT") {
      content = (scripts.find(script => script.fileName === selectedEditor.fileName) || {}).content
    }

    return {
      ...selectedEditor,
      content,
    }
  }

  return null;
}

const mapStateToProps = ({ workspace: { editors }, scripts, sprites }) => ({
  editors,
  selectedEditor: getSelectedEditor(editors, scripts.files, sprites),
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
