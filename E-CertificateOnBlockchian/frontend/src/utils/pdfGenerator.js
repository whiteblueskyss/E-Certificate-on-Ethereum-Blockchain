import jsPDF from "jspdf";
import "../font/pacifico.js";
export function generateCertificatePDF({
  serialNo = "",
  name = "",
  registrationNumber = "",
  schoolName = "",
  department = "",
  examinationYear = "",
  letterGrade = "",
  cgpa = "",
  issueDate = "",
  token = "",
  qrDataUrl = "",
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Add Canva background image (make sure the file is in public folder)
  doc.addImage("/ecertificate_bg.png", "PNG", 0, 0, pageWidth, pageHeight);

  // Overlay dynamic fields - adjust x, y positions as needed

  doc.setFont("Pacifico", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(name, 170, 417);

  doc.setFontSize(20);
  doc.setFont("times", "italic");
  doc.text(`Bachelor of Science (Engineering)`, 180, 335);
  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");

  doc.text(`Bachelor of Science (Engineering)`, 250, 450);
  doc.text(`${registrationNumber}`, 459, 210);
  doc.text(`${serialNo}`, 145, 209);
  doc.text(schoolName, 250, 518);
  doc.text(`${department}`, 225, 483);
  doc.text(`${examinationYear}`, 400, 552);
  doc.text(`${letterGrade}`, 370, 588);
  doc.text(`${cgpa}`, 135, 613);
  doc.text(`${issueDate}`, 70, 737);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 240, 770);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", 286, 686, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", 250, 690, 70, 70);
  }
  // Save PDF
  doc.save(`certificate_${registrationNumber}.pdf`);
}

// New: Generate PDF and return as Data URL for preview
export function generateCertificatePDFDataUrl({
  serialNo = "",
  name = "",
  registrationNumber = "",
  schoolName = "",
  department = "",
  examinationYear = "",
  letterGrade = "",
  cgpa = "",
  issueDate = "",
  token = "",
  qrDataUrl = "",
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.addImage("/ecertificate_bg.png", "PNG", 0, 0, pageWidth, pageHeight);

  doc.setFont("Pacifico", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(name, 170, 417);

  doc.setFontSize(20);
  doc.setFont("times", "italic");
  doc.text(`Bachelor of Science (Engineering)`, 180, 335);
  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");

  doc.text(`Bachelor of Science (Engineering)`, 250, 450);
  doc.text(`${registrationNumber}`, 459, 210);
  doc.text(`${serialNo}`, 145, 209);
  doc.text(schoolName, 250, 518);
  doc.text(`${department}`, 225, 483);
  doc.text(`${examinationYear}`, 400, 552);
  doc.text(`${letterGrade}`, 370, 588);
  doc.text(`${cgpa}`, 135, 613);
  doc.text(`${issueDate}`, 70, 737);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 240, 770);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", 286, 686, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", 250, 690, 70, 70);
  }
  // Return as Data URL string
  return doc.output("dataurlstring");
}

// New: Generate PDF and return as Blob for preview
export function generateCertificatePDFBlob({
  serialNo = "",
  name = "",
  registrationNumber = "",
  schoolName = "",
  department = "",
  examinationYear = "",
  letterGrade = "",
  cgpa = "",
  issueDate = "",
  token = "",
  qrDataUrl = "",
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.addImage("/ecertificate_bg.png", "PNG", 0, 0, pageWidth, pageHeight);
  doc.setFont("Pacifico", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(name, 170, 417);

  doc.setFontSize(20);
  doc.setFont("times", "italic");
  doc.text(`Bachelor of Science (Engineering)`, 180, 335);
  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");

  doc.text(`Bachelor of Science (Engineering)`, 250, 450);
  doc.text(`${registrationNumber}`, 459, 210);
  doc.text(`${serialNo}`, 145, 209);
  doc.text(schoolName, 250, 518);
  doc.text(`${department}`, 225, 483);
  doc.text(`${examinationYear}`, 400, 552);
  doc.text(`${letterGrade}`, 370, 588);
  doc.text(`${cgpa}`, 135, 613);
  doc.text(`${issueDate}`, 70, 737);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 240, 770);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", 286, 686, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", 250, 690, 70, 70);
  }
  // Return as Blob
  return doc.output("blob");
}
