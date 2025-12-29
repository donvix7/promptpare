import { NextResponse } from 'next/server'

const fallbackComparisons = (item1, item2) => [
  { feature: 'Nature', item1Value: `${item1} has unique properties`, item2Value: `${item2} has unique properties`, highlight: 'both' },
  { feature: 'Use', item1Value: `Used in various contexts`, item2Value: `Used in various contexts`, highlight: 'both' },
  { feature: 'Significance', item1Value: `Has cultural relevance`, item2Value: `Has cultural relevance`, highlight: 'both' }
]

export async function POST(request) {
  try {
    const { item1, item2 } = await request.json()

    if (!item1 || !item2) {
      return NextResponse.json(
        { error: 'Please provide two items to compare' },
        { status: 400 }
      )
    }

    // SIMPLIFIED VERSION - Single call without reasoning to save credits
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_2_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview', // This model is cheaper
        messages: [{
          role: 'user',
          content: `Compare "${item1}" and "${item2}" and return ONLY valid JSON with this exact structure (no other text):
          {
            "comparisons": [
              {"feature": "Feature 1", "item1Value": "Value for item1", "item2Value": "Value for item2", "highlight": "item1/item2/both"},
              {"feature": "Feature 2", "item1Value": "Value for item1", "item2Value": "Value for item2", "highlight": "item1/item2/both"},
              {"feature": "Feature 3", "item1Value": "Value for item1", "item2Value": "Value for item2", "highlight": "item1/item2/both"},
              ...
            ],
            "summary": "Brief summary of comparison"
          }`
        }],
        max_tokens: 500, // Explicitly limit tokens to save credits
        temperature: 0.3 // Lower temperature for more consistent JSON
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenRouter Error:', errorData)

      // Fallback to simpler model or response
      return NextResponse.json({
        item1, item2,
        comparisons: fallbackComparisons(item1, item2),
        summary: `Comparison of ${item1} and ${item2}`,
        generatedAt: new Date().toISOString(),
        isFallback: true,
        error: errorData.error?.message || 'API error'
      })
    }

    const result = await response.json()
    const content = result.choices[0].message.content

    // Try to extract JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : content
      const data = JSON.parse(jsonString)

      // Ensure it has the expected structure
      if (!data.comparisons || !data.summary) {
        throw new Error('Invalid response structure')
      }

      data.generatedAt = new Date().toISOString()
      data.creditsUsed = result.usage?.total_tokens || 0

      return NextResponse.json({ ...data, item1, item2 })
    } catch (parseError) {
      console.log('JSON parsing failed, using fallback')
      return NextResponse.json({
        item1, item2,
        comparisons: fallbackComparisons(item1, item2),
        summary: `Comparison of ${item1} and ${item2}`,
        generatedAt: new Date().toISOString(),
        isFallback: true,
        rawError: parseError.message
      })
    }

  } catch (error) {
    console.error('API Error:', error)

    // Try to get items from request body for fallback
    //let item1 = 'Item1', item2 = 'Item2'
    try {
      const requestClone = request.clone()
      const body = await requestClone.json()
      item1 = body.item1 || item1
      item2 = body.item2 || item2
    } catch (e) {
      // Use default values
    }

    return NextResponse.json({
      item1, item2,
      comparisons: fallbackComparisons(item1, item2),
      summary: `Basic comparison of ${item1} and ${item2}`,
      generatedAt: new Date().toISOString(),
      isFallback: true,
      error: error.message
    })
  }
}