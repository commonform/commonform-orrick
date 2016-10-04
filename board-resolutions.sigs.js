var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

console.log(JSON.stringify(
  input.Directors.map(function (director, index) {
    return {
      header: index === 0
      ? (
        'The undersigned, constituting all the directors of ' +
        input['Company Name'] +
        ', hereby take this action by unanimous written consent.'
      )
      : undefined,
      samePage: index !== 0,
      information: ['date'],
      name: director
    }
  })
))
