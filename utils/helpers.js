const helpers = {
  formatDate: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  urlCompiler: function (str, query) {
    return (recompiled =
      str.split(/upload/)[0] + `upload/${query}` + str.split(/upload/)[1]);
    },
  };

  module.exports = helpers;
