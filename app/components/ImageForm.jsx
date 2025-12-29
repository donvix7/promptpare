"use client"
import React, { useState } from 'react'

const ImageForm = () => {
  const [comparisonType, setComparisonType] = useState('simple')
  const [item1, setItem1] = useState(null)
  const [item2, setItem2] = useState(null)
  const [preview1, setPreview1] = useState(null)
  const [preview2, setPreview2] = useState(null)
  const [prompt, setPrompt] = useState('')


  const handleHandleFileChange = (e, setItem, setPreview) => {
    const file = e.target.files[0]
    if (file) {
      setItem(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleCompare = () => {
    console.log(item1, item2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (item1 && item2) {
      handleCompare()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="item1" className="block text-sm font-medium text-gray-700 mb-2">
            First Item
          </label>
          <div className="relative group">
            <input
              type="file"
              id="item1"
              accept="image/*"
              onChange={(e) => handleHandleFileChange(e, setItem1, setPreview1)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={!item1}
            />
            {preview1 && (
              <div className="mt-4 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
                <img
                  src={preview1}
                  alt="Preview 1"
                  className="max-h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setItem1(null)
                    setPreview1(null)
                    const input = document.getElementById('item1')
                    if (input) input.value = ''
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >

                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="item2" className="block text-sm font-medium text-gray-700 mb-2">
            Second Item
          </label>
          <div className="relative group">
            <input
              type="file"
              id="item2"
              accept="image/*"
              onChange={(e) => handleHandleFileChange(e, setItem2, setPreview2)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={!item2}
            />
            {preview2 && (
              <div className="mt-4 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
                <img
                  src={preview2}
                  alt="Preview 2"
                  className="max-h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setItem2(null)
                    setPreview2(null)
                    const input = document.getElementById('item2')
                    if (input) input.value = ''
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >

                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="comparisonType" className="block text-sm font-medium text-gray-700 mb-2">
          Prompt
        </label>

        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!item1 || !item2}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 ${(!item1 || !item2) ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
            }`}
        >
          Compare with AI
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Try comparing: Product designs, UI Mockups, Logos, or any two images.</p>
      </div>
    </form>
  )
}

export default ImageForm
