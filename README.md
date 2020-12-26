# Rule of Thumb

## Setup
- Go to terminal and run:
```bash
  npm install
```

### Run on dev
- Go to terminal and run:
```bash
  npm run dev
```
- Live reload server available on http://localhost:8080

### Production build
- Go to terminal and run:
```bash
  npm run build
```
- Minified files available on `./dist`

### Run e2e tests
- Go to terminal and run:
```bash
  npm run test
```
- Last results
```bash
       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  Home.spec.js                             00:10       58       58        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  VotingCard.spec.js                       00:33       17       17        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:43       75       75        -        -        -  
```