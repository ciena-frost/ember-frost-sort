module.exports = {
  description: '',
  normalizeEntityName: function () {},

  /**
    Installs specified packages at the root level of the application.
    Triggered by 'ember install <addon name>'.

    @returns {Promise} package names and versions
  */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-computed-decorators', target: '0.2.2'},
        {name: 'ember-frost-core', target: '>=0.8.0 <2.0.0'},
        {name: 'ember-hook', target: '1.3.1'},
        {name: 'ember-prop-types', target: '^2.0.0'}
      ]
    })
  }
}
