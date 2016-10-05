var input = JSON.parse(require('fs').readFileSync('/dev/stdin'))

var pages = [
  {
    term: 'Assignor',
    information: ['address'],
    header: (
      'The parties have executed this Common Stock Purchase ' +
      'Agreement as of the date first set forth above.'
    )
  },
  {
    term: 'Company',
    entities: [
      {
        name: input.Company,
        form: 'corporation',
        jurisdiction: 'Delaware'
      }
    ],
    information: ['address', 'email'],
    header: (
      'The parties have executed this Common Stock ' +
      'Purchase Agreement as of the date first set forth above.'
    )
  }
]

if (input.Spouse) {
  pages.splice(1, 0, {
    header: (
      'I, spouse of Purchaser, ' +
      'have read and hereby approve the foregoing ' +
      'Common Stock Purchase Agreement. ' +
      'In consideration of the Company\'s granting my spouse ' +
      'the right to purchase the Shares as set forth in ' +
      'the Common Stock Purchase Agreement, ' +
      'I hereby agree to be bound irrevocably by the Agreement ' +
      'and further agree that any community property or other such ' +
      'interest that I may have in the Shares ' +
      'shall hereby be similarly bound by ' +
      'the Common Stock Purchase Agreement. ' +
      'I hereby appoint my spouse as my attorney-in-fact ' +
      'with respect to any amendment or exercise or waiver of any ' +
      'rights under the Common Stock Purchase Agreement.'
    ),
    name: input.Spouse
  })
}

console.log(JSON.stringify(pages))
