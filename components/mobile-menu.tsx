"use client"

import { useState } from "react"
import Link from "next/link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="md:hidden text-2xl text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-5 flex flex-col gap-4 md:hidden">
          <Link
            href="/directory"
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Find Doctors
          </Link>
          <Link
            href="/support"
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>
          <Link
            href="/auth"
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </>
  )
}
