// src/components/LoadingSpinner.js

interface LoadingSpinnerProps {
  message?: string; // Opsional: Pesan yang ditampilkan di bawah spinner
}

function LoadingSpinner({ message = "Tunggu Sebentar..." }: LoadingSpinnerProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
      role="status" // Untuk aksesibilitas
      aria-label="Loading"
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-800"
          aria-hidden="true" // Sembunyikan dari screen reader
        ></div>
        {/* Pesan */}
        <span className="mt-4 text-white text-lg font-medium">{message}</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;

