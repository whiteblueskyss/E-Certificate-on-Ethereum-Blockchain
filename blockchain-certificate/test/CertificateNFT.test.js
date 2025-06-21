// Tests for CertificateNFT contract

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateNFT", function () {
  let CertificateNFT, certificateNFT, owner, student, other;

  beforeEach(async function () {
    [owner, student, other] = await ethers.getSigners();
    CertificateNFT = await ethers.getContractFactory("CertificateNFT");
    certificateNFT = await CertificateNFT.deploy();
    await certificateNFT.deployed();
  });

  it("should allow admin to issue a certificate and student to fetch it", async function () {
    const certData = {
      name: "Alice",
      registrationNumber: "2025001",
      cgpa: "3.95",
      department: "CSE",
      passingYear: "2025",
    };
    // Admin issues certificate to student
    await expect(
      certificateNFT.issueCertificate(
        student.address,
        certData.name,
        certData.registrationNumber,
        certData.cgpa,
        certData.department,
        certData.passingYear
      )
    ).to.emit(certificateNFT, "CertificateIssued");

    // Student fetches their certificate
    const cert = await certificateNFT
      .connect(student)
      .getCertificate(student.address);
    expect(cert.name).to.equal(certData.name);
    expect(cert.registrationNumber).to.equal(certData.registrationNumber);
    expect(cert.cgpa).to.equal(certData.cgpa);
    expect(cert.department).to.equal(certData.department);
    expect(cert.passingYear).to.equal(certData.passingYear);
  });

  it("should not allow non-admin to issue a certificate", async function () {
    await expect(
      certificateNFT
        .connect(student)
        .issueCertificate(
          student.address,
          "Bob",
          "2025002",
          "3.80",
          "EEE",
          "2025"
        )
    ).to.be.revertedWith("OwnableUnauthorizedAccount");
  });

  it("should not allow issuing more than one certificate to a student", async function () {
    await certificateNFT.issueCertificate(
      student.address,
      "Alice",
      "2025001",
      "3.95",
      "CSE",
      "2025"
    );
    await expect(
      certificateNFT.issueCertificate(
        student.address,
        "Alice",
        "2025001",
        "3.95",
        "CSE",
        "2025"
      )
    ).to.be.revertedWith("Student already has a certificate");
  });
});
