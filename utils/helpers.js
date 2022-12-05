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

  // const helpers = {
//     format_time: (date) => {
//       return date.toLocaleTimeString();
//     },
//     format_date: (date) => {
//       // Using JavaScript Date methods, we get and format the month, date, and year
//       return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
//         // We add five years to the 'year' value to calculate the end date
//         new Date(date).getFullYear()
//       }`;
//     },
//   };

//   module.exports = helpers;
