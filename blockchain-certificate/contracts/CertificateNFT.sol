// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    struct Certificate {
        string name;
        string registrationNumber;
        string cgpa;
        string department;
        string passingYear;
    }

    mapping(address => uint256) public studentToTokenId;
    mapping(uint256 => Certificate) public certificates;
    uint256 public nextTokenId = 1;

    event CertificateIssued(address indexed student, uint256 tokenId);

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {}

    function issueCertificate(
        address student,
        string memory name,
        string memory registrationNumber,
        string memory cgpa,
        string memory department,
        string memory passingYear
    ) external onlyOwner {
        require(studentToTokenId[student] == 0, "Student already has a certificate");
        uint256 tokenId = nextTokenId++;
        _safeMint(student, tokenId);
        certificates[tokenId] = Certificate(name, registrationNumber, cgpa, department, passingYear);
        studentToTokenId[student] = tokenId;
        emit CertificateIssued(student, tokenId);
    }

    function getCertificate(address student) external view returns (Certificate memory) {
        uint256 tokenId = studentToTokenId[student];
        require(tokenId != 0, "No certificate for this student");
        return certificates[tokenId];
    }
}
