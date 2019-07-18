// Example model
class Article {
  constructor(opts) {
    if (!opts)
      opts = {};
    this.title = opts.title || '';
    this.url = opts.url || '';
    this.text = opts.text || '';
  }
}

module.exports = Article;

