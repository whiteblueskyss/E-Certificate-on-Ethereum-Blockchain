import { useEffect, useState } from "react";
import { getContract, getProvider } from "../utils/blockchain";

function getTokenFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || "";
}

export default function VerifyPage() {
  const [input, setInput] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("");
  const tokenFromUrl = getTokenFromQuery();

  useEffect(() => {
    if (tokenFromUrl) {
      verifyToken(tokenFromUrl);
      setInput(tokenFromUrl);
    }
    // eslint-disable-next-line
  }, [tokenFromUrl]);

  async function verifyToken(token) {
    setStatus("Verifying...");
    setCertificate(null);
    if (!token) {
      setStatus("Please enter a certificate token.");
      return;
    }
    try {
      const provider = await getProvider();
      const contract = await getContract(provider);
      const cert = await contract.getCertificateByToken(token);
      const certObj = {
        serialNo: cert[0],
        registrationNumber: cert[1],
        name: cert[2],
        schoolName: cert[3],
        department: cert[4],
        examinationYear: cert[5],
        letterGrade: cert[6],
        cgpa: cert[7],
        issueDate: cert[8],
        token: cert[10],
      };
      setCertificate(certObj);
      setStatus("Valid certificate issued by admin.");
    } catch (err) {
      setCertificate(null);
      setStatus("Invalid certificate or not issued by admin.");
    }
  }

  async function handleVerify() {
    verifyToken(input);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Certificate Verification</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter certificate token"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: 350, marginRight: 10 }}
        />
        <button onClick={handleVerify}>Verify</button>
      </div>
      {status && <div style={{ marginBottom: 20 }}>{status}</div>}
      {certificate && (
        <div style={{ marginTop: 20 }}>
          <div>Serial No: {certificate.serialNo}</div>
          <div>Name: {certificate.name}</div>
          <div>Registration Number: {certificate.registrationNumber}</div>
          <div>School: {certificate.schoolName}</div>
          <div>Department: {certificate.department}</div>
          <div>Examination Year: {certificate.examinationYear}</div>
          <div>Letter Grade: {certificate.letterGrade}</div>
          <div>CGPA: {certificate.cgpa}</div>
          <div>Issue Date: {certificate.issueDate}</div>
          <div>Token: {certificate.token}</div>
        </div>
      )}
    </div>
  );
}
