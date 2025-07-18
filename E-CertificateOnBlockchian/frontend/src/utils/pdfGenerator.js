import jsPDF from "jspdf";
import "../font/pacifico.js";

/**
 * Certificate data structure for PDF generation
 */
const DEFAULT_CERTIFICATE_DATA = {
  serialNo: "",
  name: "",
  registrationNumber: "",
  schoolName: "",
  department: "",
  examinationYear: "",
  letterGrade: "",
  cgpa: "",
  issueDate: "",
  token: "",
  qrDataUrl: "",
};

/**
 * Core PDF generation function - creates the certificate layout
 * @param {Object} data - Certificate data
 * @returns {jsPDF} - PDF document instance
 */
function createCertificatePDF(data) {
  const certificateData = { ...DEFAULT_CERTIFICATE_DATA, ...data };

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Add background image
  doc.addImage("/ecertificate_bg.png", "PNG", 0, 0, pageWidth, pageHeight);

  // Set default styling
  doc.setFont("Pacifico", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);

  // Certificate content positioning (adjust these coordinates as needed)
  const positions = {
    name: [170, 417],
    degree: [180, 335],
    degreeField: [250, 450],
    registrationNumber: [459, 210],
    serialNo: [145, 209],
    schoolName: [250, 518],
    department: [225, 483],
    examinationYear: [400, 552],
    letterGrade: [370, 588],
    cgpa: [135, 613],
    issueDate: [70, 737],
    token: [240, 770],
    qrText: [286, 686],
    qrImage: [250, 690, 70, 70], // x, y, width, height
  };

  // Student name
  doc.text(certificateData.name, ...positions.name);

  // Degree title
  doc.setFontSize(20);
  doc.setFont("times", "italic");
  doc.text("Bachelor of Science (Engineering)", ...positions.degree);

  // Reset font for other fields
  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");

  // Certificate fields
  doc.text("Bachelor of Science (Engineering)", ...positions.degreeField);
  doc.text(certificateData.registrationNumber, ...positions.registrationNumber);
  doc.text(certificateData.serialNo, ...positions.serialNo);
  doc.text(certificateData.schoolName, ...positions.schoolName);
  doc.text(certificateData.department, ...positions.department);
  doc.text(certificateData.examinationYear, ...positions.examinationYear);
  doc.text(certificateData.letterGrade, ...positions.letterGrade);
  doc.text(certificateData.cgpa, ...positions.cgpa);
  doc.text(certificateData.issueDate, ...positions.issueDate);

  // Token (smaller font)
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${certificateData.token}`, ...positions.token);

  // QR Code for verification
  if (certificateData.qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", ...positions.qrText, { align: "center" });
    doc.addImage(certificateData.qrDataUrl, "PNG", ...positions.qrImage);
  }

  return doc;
}

/**
 * Generate and download PDF certificate
 * @param {Object} data - Certificate data
 */
export function generateCertificatePDF(data) {
  const doc = createCertificatePDF(data);
  const filename = `certificate_${data.registrationNumber || "unknown"}.pdf`;
  doc.save(filename);
}

/**
 * Generate PDF certificate and return as Data URL for preview
 * @param {Object} data - Certificate data
 * @returns {string} - PDF as data URL string
 */
export function generateCertificatePDFDataUrl(data) {
  const doc = createCertificatePDF(data);
  return doc.output("dataurlstring");
}

/**
 * Generate PDF certificate and return as Blob for preview
 * @param {Object} data - Certificate data
 * @returns {Blob} - PDF as Blob object
 */
export function generateCertificatePDFBlob(data) {
  const doc = createCertificatePDF(data);
  return doc.output("blob");
}

/**
 * Utility function to validate certificate data
 * @param {Object} data - Certificate data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export function validateCertificateData(data) {
  const errors = [];
  const requiredFields = [
    "name",
    "registrationNumber",
    "schoolName",
    "department",
    "examinationYear",
    "letterGrade",
    "cgpa",
    "issueDate",
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
