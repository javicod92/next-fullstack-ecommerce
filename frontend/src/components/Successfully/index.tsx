"use client";

export default function SuccessPage() {
  return (
    <div className="success-container">
      <div className="success-overlay"></div>
      <div className="success-message">
        <div className="rounded-full border p-4 bg-white text-[#07a954]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <div>
          <h2>Thanks for your order</h2>
          <p>We will email you when the product is shipped.</p>
        </div>
      </div>
    </div>
  );
}
