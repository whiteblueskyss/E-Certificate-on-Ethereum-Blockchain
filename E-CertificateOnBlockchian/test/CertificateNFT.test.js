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
      schoolName: "School of Engineering",
      examinationYear: "2025",
      letterGrade: "A",
      issueDate: "2025-06-24",
      token: "0x1234567890abcdef",
    };
    // Admin issues certificate to student
    await expect(
      certificateNFT.issueCertificate(
        student.address,
        certData.registrationNumber,
        certData.name,
        certData.schoolName,
        certData.department,
        certData.examinationYear,
        certData.letterGrade,
        certData.cgpa,
        certData.issueDate,
        certData.token
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
    expect(cert.schoolName).to.equal(certData.schoolName);
    expect(cert.examinationYear).to.equal(certData.examinationYear);
    expect(cert.letterGrade).to.equal(certData.letterGrade);
    expect(cert.issueDate).to.equal(certData.issueDate);
    expect(cert.token).to.equal(certData.token);
  });

  it("should not allow non-admin to issue a certificate", async function () {
    await expect(
      certificateNFT
        .connect(student)
        .issueCertificate(
          student.address,
          "2025002",
          "Bob",
          "School of Engineering",
          "EEE",
          "2025",
          "A",
          "3.80",
          "2025-06-24",
          "0xabcdef1234567890"
        )
    ).to.be.revertedWith("OwnableUnauthorizedAccount");
  });

  it("should not allow issuing more than one certificate to a student", async function () {
    await certificateNFT.issueCertificate(
      student.address,
      "2025001",
      "Alice",
      "School of Engineering",
      "CSE",
      "2025",
      "A",
      "3.95",
      "2025-06-24",
      "0x1234567890abcdef"
    );
    await expect(
      certificateNFT.issueCertificate(
        student.address,
        "2025001",
        "Alice",
        "School of Engineering",
        "CSE",
        "2025",
        "A",
        "3.95",
        "2025-06-24",
        "0x1234567890abcdef"
      )
    ).to.be.revertedWith("Student already has a certificate");
  });
});
