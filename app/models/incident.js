// Example model
class Incident {
  constructor(opts) {
    if (!opts)
      opts = {};
    this.id = opts.id || '';
    this.title = opts.title || '';
    this.description = opts.description || '';
    this.date = opts.occurred_at || '';
    this.type = opts.type || '';
  }
}
  
  module.exports = Incident;

  
  