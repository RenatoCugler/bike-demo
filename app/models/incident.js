class Incident {
  constructor(opts) {
    if (!opts)
      opts = {};
    this.id = opts.id || '';
    this.title = opts.title || '';
    this.description = opts.description || '';
    this.address = opts.address || '';
    this.date = opts.occurred_at || '';
    this.type = opts.type || '';
    this.type = opts.URL || '';
    this.source = opts.source.html_url || '';
   
  }
}
  
  module.exports = Incident;