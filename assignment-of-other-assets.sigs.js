var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

var pages = [
  {
    header: (
      'In witness whereof, ' +
      'the undersigned have executed this ' +
      'Agreement effective as of the ' +
      'date and year first above written.'
    ),
    term: 'Assignor',
    information: ['address', 'email'],
    name: input.Name
  },
  {
    header: (
      'In witness whereof, the undersigned have executed this ' +
      'Agreement effective as of the date and year first above written.'
    ),
    term: 'Company',
    entities: [
      {
        name: input['Company Name'],
        jurisdiction: 'Delaware',
        form: 'corporation'
      }
    ],
    information: ['address']
  }
]

if (input.Spouse) {
  pages.splice(1, 0, {
    header: (
      'In witness whereof, ' +
      'the undersigned have executed this Agreement ' +
      'effective as of the date and year first above written.'
    ),
    name: input.Spouse
  })
}

console.log(JSON.stringify(pages))
