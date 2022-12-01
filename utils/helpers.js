const helpers = {
  format_time: (date) => {
    return Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  },

    urlCompiler: function (str, query) {
      return (recompiled =
        str.split(/upload/)[0] + `upload/${query}` + str.split(/upload/)[1]);
    },
  };

  module.exports = helpers;