var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

var pages = [
  {
    header: (
      'The undersigned executes this Election ' +
      'Under Section 83(b) of the Internal Revenue Code of 1986 ' +
      'as of the date written below.'
    ),
    name: input.Name,
    term: 'Purchaser',
    information: ['address']
  }
]

if (input.Spouse) {
  pages.push({
    header: (
      'The undersigned spouse of the Purchaser ' +
      'countersigns this Acknowledgment and Statement of Decision ' +
      'as of the date written next to the Purchaser\'s signature.'
    ),
    name: input.Spouse
  })
}

console.log(JSON.stringify(pages))
