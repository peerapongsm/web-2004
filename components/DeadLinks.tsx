"use client";

import { useState } from "react";
import { Toast } from "./Toast";
import { MuseumInfoButton } from "./MuseumInfoButton";

const LINKS = [
  { id: "msn", annotationId: "dead-link-msn", label: "💬 แอด MSN เมย์" },
  { id: "ragnarok", annotationId: "dead-link-ragnarok", label: "⚔️ กิลด์ Ragnarok ของเมย์" },
  { id: "pantip", annotationId: "dead-link-pantip", label: "📝 กระทู้ Pantip ที่เมย์ตั้ง" },
];

export function DeadLinks() {
  const [toastLabel, setToastLabel] = useState<string | null>(null);

  return (
    <div className="dead-links-panel">
      <h2 className="section-title">
        🔗 ลิงก์เพื่อนๆ ของเมย์ <MuseumInfoButton id="table-layout" />
      </h2>
      {/* deliberate retro table layout — see museum annotation "table-layout" */}
      <table className="dead-links-table" cellPadding={0} cellSpacing={6} border={0}>
        <tbody>
          <tr>
            {LINKS.map((link) => (
              <td key={link.id}>
                <button type="button" className="btn btn-outline dead-link-btn" onClick={() => setToastLabel(link.label)}>
                  {link.label}
                </button>
                <MuseumInfoButton id={link.annotationId} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {toastLabel && (
        <Toast message={`ลิงก์นี้ตายไปแล้ว 20 ปี 💀 (${toastLabel})`} onClose={() => setToastLabel(null)} />
      )}
    </div>
  );
}
