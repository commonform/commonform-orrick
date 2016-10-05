var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

var pages = [
  {
    header: (
      'The undersigned executes this receipt and consent ' +
      'as of the date written below.'
    ),
    name: input.Name,
    term: 'Purchaser',
    information: ['date']
  }
]

if (input.Spouse) {
  pages.push({
    header: (
      'Purchaser\'s spouse executes this ' +
      'receipt and consent ' +
      'as of the date written beside Purchaser\'s signature.'
    ),
    name: input.Spouse
  })
}

console.log(JSON.stringify(pages))
