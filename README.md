# token-negotiator-cypress-poc
Proof-of-concept for testing [Smart Token Labs](https://smarttokenlabs.com/) [token-negotiator](https://github.com/TokenScript/token-negotiator) with [Cypress](https://www.cypress.io). 

**Note:** This is a minimalist technical POC to research the technical feasibility of token-negotiator user-interface testing. It has been kept deliberately simple. It is not DRY and there are no abstraction layers for test steps and element locators etc.


## Stack

* Cypress 9.5.3
* [cypress-metamask-v2](https://github.com/saxenashivang/cypress-metamask-v2) 1.6.10
* MetaMask 9.5.1

Test environment
* Chrome 100
* Windows 10 | macOS 12.1

## Setup

Note that a [patch](./patch/metamask.js) is required for cypress-metamask-v2 to work-around an issue with `setupMetamask` being called twice. See [here](https://github.com/Synthetixio/synpress/issues/320#issuecomment-1028873290) for further details.

```
npm install
npm run patch
```

### On-chain tests only

1. Create a `.env` file with the entry `ON_CHAIN_SECRET_WORDS` containing the pass phrase for a wallet containing at least one test NFT.
2. Fork [token-negotiator-on-chain-poc-example](https://github.com/TokenScript/token-negotiator-on-chain-poc-example) and configure the negotiator client in `index.html` with a contract containing at leas t one owned test NFT.
3. Modify the on-chain-poc spec test data to match the requirements of the test NFT.

## Tests


### Without MetaMask

| Spec | Script | Description
| --- | --- | --- |
| hotel-passive | test:passive | Smoke test no tickets issued
| hotel-passive-e2e | test:passive-e2e | Issue tickets and obtain benefits
| ticket-issuer | test:issuer | Confirm tickets can be issued

### With MetaMask


| Spec | Script | Description
| --- | --- | --- |
| hotel-active | test:active | Smoke test no tickets issued
| hotel-active-e2e | test:active-e2e | Issue tickets and obtain discount
| on-chain-poc | test:on-chain | Use an NFT to obtain special offers

Note that tests requiring MetaMask cannot be run in headless mode.
