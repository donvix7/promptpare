'use client'

export default function ComparisonTable({ comparison }) {
  const { item1, item2, comparisons } = comparison

  const getHighlightClass = (highlight) => {
    if (highlight === 'both') return 'bg-green-50 border-green-200'
    if (highlight === 'item1') return 'bg-blue-50 border-blue-200'
    if (highlight === 'item2') return 'bg-purple-50 border-purple-200'
    return ''
  }

  const getHighlightText = (highlight) => {
    if (highlight === 'both') return '✓ Both'
    if (highlight === 'item1') return '✓ Best'
    if (highlight === 'item2') return '✓ Best'
    return ''
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature/Specification
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
              {item1}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-purple-50">
              {item2}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Highlight
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {comparisons.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.feature}
                {row.category && (
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {row.category}
                  </span>
                )}
              </td>
              <td className={`px-6 text-gray-900 py-4 text-sm ${row.highlight === 'item1' ? 'font-semibold' : ''}`}>
                {row.item1Value}
              </td>
              <td className={`px-6 text-gray-900 py-4 text-sm ${row.highlight === 'item2' ? 'font-semibold' : ''}`}>
                {row.item2Value}
              </td>
              <td className={`px-6 py-4 text-sm ${getHighlightClass(row.highlight)}`}>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  row.highlight === 'both' ? 'bg-green-100 text-green-800' :
                  row.highlight === 'item1' ? 'bg-blue-100 text-blue-800' :
                  row.highlight === 'item2' ? 'bg-purple-100 text-purple-800' :
                  ''
                }`}>
                  {getHighlightText(row.highlight)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}