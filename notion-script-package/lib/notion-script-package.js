'use babel';

import NotionScriptPackageView from './notion-script-package-view';
import { CompositeDisposable } from 'atom';

export default {

  notionScriptPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.notionScriptPackageView = new NotionScriptPackageView(state.notionScriptPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.notionScriptPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'notion-script-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.notionScriptPackageView.destroy();
  },

  serialize() {
    return {
      notionScriptPackageViewState: this.notionScriptPackageView.serialize()
    };
  },

  toggle() {
    console.log('NotionScriptPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
