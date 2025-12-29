import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Comparison Tool',
  description: 'Compare any two things using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 py-8">
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                AI Comparison Tool
              </h1>
              <p className="text-gray-600">
                Compare any two things with AI-powered insights
              </p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}