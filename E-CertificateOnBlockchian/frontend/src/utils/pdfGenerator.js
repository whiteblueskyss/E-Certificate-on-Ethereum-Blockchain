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

  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`${name}`, 300, 350); // <-- Adjust x, y as needed

  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");
  doc.text(`Regn. No: ${registrationNumber}`, 300, 390);
  doc.text(`${serialNo}`, 100, 50);
  doc.text(schoolName, 300, 450);
  doc.text(`Department: ${department}`, 300, 465);
  doc.text(`Examination Year: ${examinationYear}`, 300, 480);
  doc.text(`Grade: ${letterGrade} (CGPA: ${cgpa})`, 300, 510);
  doc.text(`Date: ${issueDate}`, 300, 540);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 70, pageHeight - 80);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", pageWidth - 120, pageHeight - 180, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", pageWidth - 155, pageHeight - 170, 70, 70); // <-- Adjust position/size as needed
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
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text(name, 300, 350);
  doc.setFontSize(14);
  // doc.setFont("Pacifico", "normal");

  doc.text(`Regn. No: ${registrationNumber}`, 300, 390);
  doc.text(`${serialNo}`, 100, 50);
  doc.text(schoolName, 300, 450);
  doc.text(`Department: ${department}`, 300, 465);
  doc.text(`Examination Year: ${examinationYear}`, 300, 480);
  doc.text(`Grade: ${letterGrade} (CGPA: ${cgpa})`, 300, 510);
  doc.text(`Date: ${issueDate}`, 300, 540);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 70, pageHeight - 80);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", pageWidth - 120, pageHeight - 180, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", pageWidth - 155, pageHeight - 170, 70, 70);
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
  doc.text(name, 300, 350);
  doc.setFontSize(14);
  doc.setFont("Pacifico", "normal");
  doc.text(`Regn. No: ${registrationNumber}`, 300, 390);
  doc.text(`${serialNo}`, 100, 50);
  doc.text(schoolName, 300, 450);
  doc.text(`Department: ${department}`, 300, 465);
  doc.text(`Examination Year: ${examinationYear}`, 300, 480);
  doc.text(`Grade: ${letterGrade} (CGPA: ${cgpa})`, 300, 510);
  doc.text(`Date: ${issueDate}`, 300, 540);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text(`Token: ${token}`, 70, pageHeight - 80);
  if (qrDataUrl) {
    doc.setFontSize(10);
    doc.text("Scan to Verify:", pageWidth - 120, pageHeight - 180, {
      align: "center",
    });
    doc.addImage(qrDataUrl, "PNG", pageWidth - 155, pageHeight - 170, 70, 70);
  }
  // Return as Blob
  return doc.output("blob");
}
