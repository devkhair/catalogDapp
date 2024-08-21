// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BookCatalog {
    string private bookName;
    uint private publicationYear;

    constructor(string memory name, uint year) {
        bookName = name;
        publicationYear = year;
    }

    function updateBookName(string memory newBookName) public {
        bookName = newBookName;
    }

    function updatePublicationYear(uint newPublicationYear) public {
        publicationYear = newPublicationYear;
    }

    function getBookDetails() public view returns (string memory, uint ) {
        return (bookName, publicationYear);
    }
}
