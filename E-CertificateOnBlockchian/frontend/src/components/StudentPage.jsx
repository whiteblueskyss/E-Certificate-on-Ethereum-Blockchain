import QRCode from "qrcode";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { getContract, getProvider } from "../utils/blockchain";
import {
  generateCertificatePDF,
  generateCertificatePDFBlob,
} from "../utils/pdfGenerator";

// Student page component
export default function StudentPage() {
  const [account, setAccount] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [status, setStatus] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const qrRef = useRef();

  useEffect(() => {
    async function fetchCertificate() {
      if (!account) return;
      setStatus("Fetching certificate...");
      try {
        const provider = await getProvider();
        const contract = await getContract(provider);
        const cert = await contract.getCertificate(account);
        // Map array result to object with named fields
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
          student: cert[9],
          token: cert[10],
        };
        setCertificate(certObj);
        setStatus("");
      } catch (err) {
        setCertificate(null);
        setStatus(
          "No certificate found or error: " + (err.reason || err.message)
        );
      }
    }
    fetchCertificate();
  }, [account]);

  async function connectWallet() {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    } catch (err) {
      setStatus("Wallet connection failed");
    }
  }

  const verifyUrl = certificate
    ? `${window.location.origin}/verify?token=${certificate.token}`
    : "";

  async function handleDownloadPDF() {
    // Generate QR code PNG data URL using qrcode package
    let qrDataUrl = "";
    try {
      qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 128 });
    } catch (e) {
      // fallback: no QR
    }
    generateCertificatePDF({
      ...certificate,
      address: account,
      qrDataUrl,
    });
  }

  async function handlePreviewPDF() {
    // Generate QR code PNG data URL using qrcode package
    let qrDataUrl = "";
    try {
      qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 128 });
    } catch (e) {
      // fallback: no QR
    }
    const blob = generateCertificatePDFBlob({
      ...certificate,
      address: account,
      qrDataUrl,
    });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  }

  return (
    <div>
      <h2>Student Page</h2>
      <button onClick={connectWallet} disabled={!!account}>
        {account ? `Connected: ${account}` : "Connect MetaMask"}
      </button>
      {certificate && (
        <div style={{ marginTop: 20 }} ref={qrRef}>
          <h3>Certificate Details</h3>
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
          <div style={{ marginTop: 20 }}>
            <h4>Scan to Verify</h4>
            <QRCodeSVG value={verifyUrl} size={128} />
          </div>
          <button
            style={{ marginTop: 20, marginRight: 10 }}
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button style={{ marginTop: 20 }} onClick={handlePreviewPDF}>
            Preview Certificate
          </button>
        </div>
      )}
      {pdfUrl && (
        <div style={{ marginTop: 30 }}>
          <h3>Certificate Preview</h3>
          <iframe
            src={pdfUrl}
            title="Certificate Preview"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
}
