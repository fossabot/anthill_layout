define(function defineGistPreferences() {

    /**
     * Define Github Gist Preferences
     * @class GithubGistPreferences
     * @extends Renderer
     * @constructor
     */
    var GithubGistPreferences = function GithubGistPreferences() {
    };

    return GithubGistPreferences.extend('GithubGistPreferences', {

        /**
         * Render Gist
         * @memberOf GithubGistPreferences
         * @returns {*|jQuery}
         */
        renderGithubGist: function renderGithubGist() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{githubGistEmbedCode, activateGithubGist}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'githubGistEmbedCode',
                text: 'Github Gist Code',
                placeholder: 'Paste Github Gist Embed Code here',
                disabled: false,
                visible: true,
                value: preferences.githubGistEmbedCode || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateGithubGist',
                text: 'Activate',
                checked: preferences.activateGithubGist,
                value: preferences.activateGithubGist,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-gist-prefs" />').append(
                $textarea, $checkbox
            );
        }
    });
});