
class Safety {
    constructor(opts) {
        if (!opts)
            opts = {};
        this.style = opts.style || '';
        this.message = opts.message || '';
        this.description = opts.description || '';
        this.incidents = opts.incidents;
    }
}
  
module.exports = Safety;
  
  