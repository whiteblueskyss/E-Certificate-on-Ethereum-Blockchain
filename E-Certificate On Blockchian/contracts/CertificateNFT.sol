// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    struct Certificate {
        string serialNo;
        string registrationNumber;
        string name;
        string schoolName;
        string department;
        string examinationYear;
        string letterGrade;
        string cgpa;
        string issueDate;
        address student;
        string token;
    }

    mapping(address => uint256) public studentToTokenId;
    mapping(uint256 => Certificate) public certificates;
    mapping(string => uint256) public tokenToTokenId;
    mapping(string => bool) public registrationNumberUsed;
    mapping(address => bool) public minters;
    mapping(uint256 => address) public certificateIssuer;
    uint256 public nextTokenId = 1;
    uint256 public nextSerialNo = 10001;

    event CertificateIssued(address indexed student, uint256 tokenId, string token);
    event CertificateBurned(address indexed student, uint256 tokenId, string token);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {}

    function addMinter(address minter) external onlyOwner {
        require(!minters[minter], "Already a minter");
        minters[minter] = true;
        emit MinterAdded(minter);
    }

    function removeMinter(address minter) external onlyOwner {
        require(minters[minter], "Not a minter");
        minters[minter] = false;
        emit MinterRemoved(minter);
    }

    modifier onlyMinterOrOwner() {
        require(minters[msg.sender] || msg.sender == owner(), "Not minter or owner");
        _;
    }

    function issueCertificate(
        address student,
        string memory registrationNumber,
        string memory name,
        string memory schoolName,
        string memory department,
        string memory examinationYear,
        string memory letterGrade,
        string memory cgpa,
        string memory issueDate,
        string memory token
    ) external onlyMinterOrOwner {
        require(studentToTokenId[student] == 0, "Student already has a certificate");
        require(tokenToTokenId[token] == 0, "Token already used");
        require(!registrationNumberUsed[registrationNumber], "Registration number already used");
        uint256 tokenId = nextTokenId++;
        string memory serialNo = _toString(nextSerialNo++);
        _safeMint(student, tokenId);
        certificates[tokenId] = Certificate(serialNo, registrationNumber, name, schoolName, department, examinationYear, letterGrade, cgpa, issueDate, student, token);
        studentToTokenId[student] = tokenId;
        tokenToTokenId[token] = tokenId;
        registrationNumberUsed[registrationNumber] = true;
        certificateIssuer[tokenId] = msg.sender;
        emit CertificateIssued(student, tokenId, token);
    }

    function burnCertificate(string memory token) external onlyMinterOrOwner {
        uint256 tokenId = tokenToTokenId[token];
        require(tokenId != 0, "No certificate for this token");
        Certificate memory cert = certificates[tokenId];
        address student = cert.student;
        string memory registrationNumber = cert.registrationNumber;
        // Burn the NFT
        _burn(tokenId);
        // Clean up mappings
        delete certificates[tokenId];
        delete studentToTokenId[student];
        delete tokenToTokenId[token];
        registrationNumberUsed[registrationNumber] = false;
        delete certificateIssuer[tokenId];
        emit CertificateBurned(student, tokenId, token);
    }

    function getCertificateByToken(string memory token) external view returns (Certificate memory) {
        uint256 tokenId = tokenToTokenId[token];
        require(tokenId != 0, "No certificate for this token");
        return certificates[tokenId];
    }

    function getCertificate(address student) external view returns (Certificate memory) {
        uint256 tokenId = studentToTokenId[student];
        require(tokenId != 0, "No certificate for this student");
        return certificates[tokenId];
    }

    function isValidCertificate(string memory token) external view returns (bool) {
        uint256 tokenId = tokenToTokenId[token];
        if (tokenId == 0) return false;
        address issuer = certificateIssuer[tokenId];
        return (issuer == owner() || minters[issuer]);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
