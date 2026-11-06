export default function Spinner() {
  return (
    <div className="flex justify-center py-20" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <span className="sr-only">Memuat data...</span>
    </div>
  );
}