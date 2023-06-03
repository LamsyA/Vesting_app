# Vesting Contract

This Solidity smart contract allows organizations to create a vesting schedule for their 

tokens. The contract enables organizations to register themselves, specify the type of 

stakeholders and their vesting periods, whitelist addresses, and facilitate token claims after 

the vesting period.


## Features


--  Organizations can register themselves and their token by providing their address, name, and token amount.

-- Stakeholders can be added by organizations, including their address, stakeholder post, vesting period, and token allocation.

-- Only the organization admin can whitelist addresses for certain stakeholders (founders, investors, etc.).

-- Whitelisted stakeholders can claim their tokens after the vesting period.
Stakeholders can check their claimed token balance.

### Usage

## Contract Deployment
1. Deploy the Vesting smart contract using a Solidity compiler version equal to or higher than 0.8.7.
2. Set the appropriate SPDX license identifier in the contract.


## Contract Functions 


`addOrganisation(string memory _name, address _orgAddress, uint256 _token)`: Allows an organization to register themselves and their token with the contract. The `_name` parameter specifies the name of the organization,` _orgAddress` represents the address of the organization, and _token is the amount of tokens the organization holds.


`addStakeholder(address _stakeholderAddress, string memory _post, uint256 _vestingPeriod, uint256 _token)`: Allows the organization admin to add a stakeholder with their address, stakeholder post, vesting period, and token allocation. Requires authorization from the organization admin and checks if the token allocation is within the available token balance.


`whitelistAddress(address _stakeholder)`: Whitelists the provided address, allowing it to claim tokens. Only the organization admin can perform this action.


`claimToken()`: Whitelisted stakeholders can call this function to claim their tokens if the vesting period has elapsed. The claimed tokens are transferred to the stakeholder's address.


`getClaimedToken()`: Retrieves the claimed token balance for the caller's address.


`getStakeholderPostion(address _address)`: Retrieves the stakeholder details (including vesting period, stakeholder post, and more) for the provided address.

## How to Navigate

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

Connect your wallet and navigate the organisation page to add organisation, Stakeholder and also to add stakeholder to the white list.


To claim your Token:
Navigate to the user login and claim token once the admin has added you to the stakholder and to the white list

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
