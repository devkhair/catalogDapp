# Project Title

Catalog Contract

## Description

This is a DApp for managing a Book Catalog. It allows users to save a book's name and publication year, update these details, and view them through the user interface.

    - Contract: Contains two state variables that store the bookName and publicationYear. It includes functions to update the bookName, publicationYear, and retrieve the catalog information.
    - UI: Features a button to connect the wallet, a section displaying the user's details, and two input fields for the user to enter the book name and update the catalog information.


## Getting Started

### Executing program
UI Setup:

    - The environment is set up with React.
    - Navigate to the frontend directory.
    - Run npm install in the terminal.

Smart Contract Setup:

    - The environment is set up with Hardhat.
    - Navigate to the contract directory.
    - Run npm install in the terminal.
    - Deploy the contract by running npx hardhat run ./scripts/deploy.js.
    - After deployment, retrieve the ABI from contract/artifacts/contracts/BookCatalog.json and the contract address printed in the terminal.
    - Copy the ABI to frontend/src/abi.json.
    - Use the contract address in the UI implementation.

## Authors

Contributors names and contact info

ex. toyin



## License

This project is licensed under the MIT License 

# Address
0x6248Ae88E9cB5980984CCA5746e82E82b6B6D186

