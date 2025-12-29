'use client'

import { useEffect, useState } from 'react'
import ComparisonForm from './components/ComparisonForm'
import ComparisonTable from './components/ComparisonTable'
import LoadingSpinner from './components/LoadingSpinner'
import ImageForm from './components/ImageForm'

export default function Home() {
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(`words`)

  const tabs = [{id:`words`, label:`Words`},
        {id:`images`, label:`Images`}
      ]
 
  useEffect(() => {

  },tabs)

  return (
    <div className="max-w-6xl mx-auto ">

    {/* Tabs*/}
    <div className='flex gap-3'>
      {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 relative font-medium flex-shrink-0 ${
                activeTab === tab.id 
                  ? 'border-b-2 border-blue-700 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
    </div>
    { activeTab === `images` && (
      <div className='text-gray-500'>
        <ImageForm/>
      </div>
    )

    }

    {activeTab === `words` && (
      <div>
 <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <ComparisonForm />
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          Error: {error}
        </div>
      )}

      {comparison && !loading && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Comparison Results: {comparison.item1} vs {comparison.item2}
          </h2>
          <ComparisonTable comparison={comparison} />
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">AI Analysis Summary:</h3>
            <p className="text-blue-700">{comparison.summary}</p>
          </div>
        </div>
      )}
      </div>
    )}
      
     
    </div>
  )
}