interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center"
    >
      <h2 className="text-lg font-semibold text-red-700">
        Oops, data gagal dimuat
      </h2>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      <p className="mt-1 text-sm text-gray-600">
        Periksa koneksi internetmu, lalu coba lagi.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Coba lagi
      </button>
    </div>
  );
}