import React from 'react'
import { render } from 'react-dom'
import { Editor, EditorState, RichUtils } from 'draft-js';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onChange(editorState) {
    this.setState({editorState})
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return <div>
      <h1>Draft.js example</h1>
      <button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange.bind(this)}
      />
    </div>
  }
}

render(<App/>, document.getElementById('app'))
