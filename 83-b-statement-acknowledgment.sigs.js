var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

var pages = [
  {
    header: (
      'The undersigned executes this ' +
      'Acknowledgment and Statement of Decision ' +
      'as of the date written below.'
    ),
    term: 'Purchaser',
    name: input.Name,
    information: ['address', 'date']
  }
]

if (input.Spouse) {
  pages.push({
    header: (
      'The undersigned spouse of the Purchaser countersigns this ' +
      'Acknowledgment and Statement of Decision ' +
      'as of the date written next to the Purchaser\'s signature.'
    ),
    name: input.Spouse
  })
}

console.log(JSON.stringify(pages))
