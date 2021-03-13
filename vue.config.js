var px2rem = require('postcss-px2rem')

module.exports = {
  postcss: function () {
    return [px2rem({ remUnit: 75 })]
  }
}
