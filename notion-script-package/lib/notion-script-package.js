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
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let editorText = editor.getText()

            // removes the tabs
            editorText = editorText.replace(/(\t)/g, '')
            // replaces any multi-newlines with a single newline
            editorText = editorText.replace(/(\r\n|\r|\n){2,}/g, '\n')
            //replaces newlines with a space
            editorText = editorText.replace(/(\r\n|\r|\n)/g, ' ').trim()

            editor.setText(editorText)
            editor.saveAs(editor.getPath() + 'x')
        }
    }
};
