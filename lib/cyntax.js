'use babel';

import CyntaxView from './cyntax-view';
import { CompositeDisposable } from 'atom';

export default {

  cyntaxView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cyntaxView = new CyntaxView(state.cyntaxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cyntaxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cyntax:add': () => this.add()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cyntaxView.destroy();
  },

  serialize() {
    return {
      cyntaxViewState: this.cyntaxView.serialize()
    };
  },

  add() {
    console.log("sdfsdF");
    let editor,no = -1;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      console.log(selection);
      var buff = editor.getBuffer();
      buff.getLines().forEach(function(v,i){
        if(v == "//Method_Definitions"){
          no = i;
        }
      });
      no>=0?buff.insert(buff.rangeForRow(no).end,"\n"+selection+";") : atom.notifications.addWarning("Make sure that '//Method_Definitions' is present.");
    }
  }

};
