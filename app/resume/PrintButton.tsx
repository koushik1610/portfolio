"use client";

export default function PrintButton() {
  return (
    <button type="button" className="th-btn th-btn--secondary" onClick={() => window.print()}>
      Print or save as PDF
    </button>
  );
}
