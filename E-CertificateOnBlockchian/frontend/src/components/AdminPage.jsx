import { useState } from "react";
import {
  generateToken,
  getContract,
  getOwner,
  getProvider,
} from "../utils/blockchain";

const SCHOOL_OPTIONS = [
  "School of Engineering",
  "School of Business",
  "School of Arts",
  "School of Science",
];

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

function calculateGrade(cgpa) {
  const n = parseFloat(cgpa);
  if (n >= 3.7) return "A";
  if (n >= 3.0) return "B";
  if (n >= 2.0) return "C";
  return "D";
}

export default function AdminPage() {
  const [account, setAccount] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    student: "",
    name: "",
    registrationNumber: "",
    schoolName: SCHOOL_OPTIONS[0],
    department: "",
    examinationYear: "",
    cgpa: "",
    issueDate: getCurrentDate(),
  });
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  async function connectWallet() {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      const owner = await getOwner(provider);
      setIsAdmin(addr.toLowerCase() === owner.toLowerCase());
    } catch (err) {
      setStatus("Wallet connection failed");
    }
  }

  async function issueCertificate(e) {
    e.preventDefault();
    setStatus("Issuing certificate...");
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();
      const contract = await getContract(signer);
      const letterGrade = calculateGrade(form.cgpa);
      const newToken = generateToken();
      setToken(newToken);
      // Check registration number uniqueness before sending transaction
      const regUsed = await contract.registrationNumberUsed(
        form.registrationNumber
      );
      if (regUsed) {
        setStatus("Error: Registration number already used");
        return;
      }
      const tx = await contract.issueCertificate(
        form.student,
        form.registrationNumber,
        form.name,
        form.schoolName,
        form.department,
        form.examinationYear,
        letterGrade,
        form.cgpa,
        form.issueDate,
        newToken
      );
      await tx.wait();
      setStatus("Certificate issued successfully! Token: " + newToken);
      setForm({
        student: "",
        name: "",
        registrationNumber: "",
        schoolName: SCHOOL_OPTIONS[0],
        department: "",
        examinationYear: "",
        cgpa: "",
        issueDate: getCurrentDate(),
      });
    } catch (err) {
      setStatus("Error: " + (err.reason || err.message));
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={connectWallet} disabled={!!account}>
        {account ? `Connected: ${account}` : "Connect MetaMask"}
      </button>
      {account && !isAdmin ? (
        <div style={{ color: "red", marginTop: 20 }}>
          This wallet has no access to issue certificate.
        </div>
      ) : null}
      {isAdmin && (
        <form onSubmit={issueCertificate} style={{ marginTop: 20 }}>
          <input
            name="student"
            placeholder="Student Wallet Address"
            value={form.student}
            onChange={handleChange}
            required
          />
          <br />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <br />
          <input
            name="registrationNumber"
            placeholder="Registration Number"
            value={form.registrationNumber}
            onChange={handleChange}
            required
          />
          <br />
          <select
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            required
          >
            {SCHOOL_OPTIONS.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
          <br />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />
          <br />
          <input
            name="examinationYear"
            placeholder="Examination Year"
            value={form.examinationYear}
            onChange={handleChange}
            required
          />
          <br />
          <input
            name="cgpa"
            placeholder="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            required
            type="number"
            step="0.01"
            min="0"
            max="4"
          />
          <br />
          <input
            name="issueDate"
            placeholder="Issue Date"
            value={form.issueDate}
            onChange={handleChange}
            type="date"
            required
          />
          <br />
          <button type="submit">Issue Certificate</button>
        </form>
      )}
      <div style={{ marginTop: 10 }}>
        <div style={{ marginTop: 10, color: "blue" }}>
          <b>{status}</b>
        </div>
      </div>
      {/* {token && (
        <div style={{ marginTop: 10, color: "blue" }}>
          <b>Token for this certificate:</b> {token}
        </div>
      )} */}
    </div>
  );
}
