'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Telegram</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-telegram-blue transition">
              首页
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-telegram-blue transition">
              FAQ
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-telegram-blue transition">
              博客
            </Link>
            <Link href="/download" className="text-gray-700 hover:text-telegram-blue transition">
              下载
            </Link>
            <Link href="/download" className="bg-telegram-blue text-white px-6 py-2 rounded-full hover:bg-telegram-dark transition inline-block">
              开始安装
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-telegram-blue transition" onClick={() => setIsMenuOpen(false)}>
                首页
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-telegram-blue transition" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-telegram-blue transition" onClick={() => setIsMenuOpen(false)}>
                博客
              </Link>
              <Link href="/download" className="text-gray-700 hover:text-telegram-blue transition" onClick={() => setIsMenuOpen(false)}>
                下载
              </Link>
              <Link href="/download" className="bg-telegram-blue text-white px-6 py-2 rounded-full hover:bg-telegram-dark transition inline-block text-center">
                开始安装
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
