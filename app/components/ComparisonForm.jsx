'use client'

import { useState } from 'react'

const COMPARISON_TYPES = [
  { value: 'products', label: 'Products' },
  { value: 'technologies', label: 'Technologies' },
  { value: 'services', label: 'Services' },
  { value: 'companies', label: 'Companies' },
  { value: 'concepts', label: 'Concepts' },
  { value: 'general', label: 'General Comparison' },
]
const Models = [
  { id: `gpt`, value: `GPT`, label: `GPT` },
  { id: `gemini`, value: `Gemini`, label: `Gemini` }
]


export default function ComparisonForm({ onStart, onSuccess, onError }) {
  const [item1, setItem1] = useState('')
  const [item2, setItem2] = useState('')
  const [comparisonType, setComparisonType] = useState('general')
  const [model, setModel] = useState(`GPT`)
  const [loading, setLoading] = useState(false)

  const handleCompare = async (item1, item2, comparisonType) => {
    setLoading(true)
    if (onStart) onStart()

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item1, item2, comparisonType, model }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch comparison')
      }

      const data = await response.json()
      if (onSuccess) onSuccess(data)
    } catch (err) {
      if (onError) onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (item1.trim() && item2.trim()) {
      handleCompare(item1.trim(), item2.trim(), comparisonType)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=' text-gray-500'>
          <label htmlFor="item1" className="block text-sm font-medium text-gray-700 mb-2">
            First Item
          </label>
          <input
            type="text"
            id="item1"
            value={item1}
            onChange={(e) => setItem1(e.target.value)}
            placeholder="e.g., iPhone 15"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className=' text-gray-500'>
          <label htmlFor="item2" className="block text-sm font-medium text-gray-700 mb-2">
            Second Item
          </label>
          <input
            type="text"
            id="item2"
            value={item2}
            onChange={(e) => setItem2(e.target.value)}
            placeholder="e.g., Samsung Galaxy S24"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
      </div>

      <div className=' text-gray-500'>
        <label htmlFor="comparisonType" className="block text-sm font-medium text-gray-700 mb-2">
          Comparison Type
        </label>
        <select
          id="comparisonType"
          value={comparisonType}
          onChange={(e) => setComparisonType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {COMPARISON_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/*Model*/}
      <div className=' text-gray-500'>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
          AI Model
        </label>
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {Models.map((type) => (
            <option key={type.id} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Comparing...
            </span>
          ) : (
            'Compare with AI'
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Try comparing: React vs Vue, Tesla vs BMW, Netflix vs Hulu, Python vs JavaScript</p>
      </div>
    </form>
  )
}