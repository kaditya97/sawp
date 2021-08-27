import React from "react";

export default function CloseWindowBtn({ onClick }) {
  return (
    <div className="closeWindowBtn" onClick={onClick}>
      <i class="fas fa-times"></i>
    </div>
  );
}
