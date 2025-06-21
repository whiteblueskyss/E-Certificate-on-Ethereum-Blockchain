const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateNFT", function () {
  let CertificateNFT, certificateNFT, owner, student;

  beforeEach(async function () {
    [owner, student] = await ethers.getSigners();
    CertificateNFT = await ethers.getContractFactory("CertificateNFT");
    certificateNFT = await CertificateNFT.deploy();
    await certificateNFT.waitForDeployment();
  });

  it("should deploy and set the owner", async function () {
    expect(await certificateNFT.owner()).to.equal(owner.address);
  });

  it("should issue a certificate to a student", async function () {
    await certificateNFT.issueCertificate(
      student.address,
      "Alice",
      "REG123",
      "3.9",
      "CSE",
      "2025"
    );
    const cert = await certificateNFT.getCertificate(student.address);
    expect(cert.name).to.equal("Alice");
    expect(cert.registrationNumber).to.equal("REG123");
    expect(cert.cgpa).to.equal("3.9");
    expect(cert.department).to.equal("CSE");
    expect(cert.passingYear).to.equal("2025");
  });

  it("should not allow issuing more than one certificate to the same student", async function () {
    await certificateNFT.issueCertificate(
      student.address,
      "Alice",
      "REG123",
      "3.9",
      "CSE",
      "2025"
    );
    await expect(
      certificateNFT.issueCertificate(
        student.address,
        "Bob",
        "REG456",
        "3.5",
        "EEE",
        "2025"
      )
    ).to.be.revertedWith("Student already has a certificate");
  });
});
