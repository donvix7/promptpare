export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">AI is analyzing and comparing...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
    </div>
  )
}