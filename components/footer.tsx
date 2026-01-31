"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Send, BookPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const footerLinks = {
  shop: [
    { name: "Уран зохиол", href: "#fiction" },
    { name: "Нийтлэл", href: "#non-fiction" },
    { name: "Бестселлер", href: "#bestsellers" },
    { name: "Удахгүй", href: "#coming-soon" },
  ],
  support: [
    { name: "Холбоо барих", href: "#" },
    { name: "Түгээмэл асуулт", href: "#" },
    { name: "Хүргэлтийн мэдээлэл", href: "#" },
    { name: "Буцаалт", href: "#" },
  ],
  company: [
    { name: "Бидний тухай", href: "#" },
    { name: "Нууцлалын бодлого", href: "#" },
    { name: "Үйлчилгээний нөхцөл", href: "#" },
  ],
}

export function Footer() {
  const [bookRequest, setBookRequest] = useState({ name: "", bookTitle: "", author: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setBookRequest({ name: "", bookTitle: "", author: "" })
    }, 3000)
  }

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Section - Logo, Slogan, Social, Contact */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/logo.jpg"
                alt="Book Lovers Bookstore"
                width={160}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>
            
            {/* Slogan */}
            <p className="mt-4 text-base font-serif italic text-accent">
              Номтой хамт өсөж, тантай хамт хөгжинө.
            </p>
            
            {/* Social Links with Usernames */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="https://facebook.com/BookLovers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium">@BookLovers</span>
              </Link>
              
              <Link
                href="https://instagram.com/BookLovers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.63c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium">@BookLovers</span>
              </Link>
            </div>
            
            {/* Contact Phone Numbers */}
            <div className="mt-6 flex items-center gap-2 text-foreground">
              <Phone className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold">96212100</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm font-semibold">88838201</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-6">
            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Дэлгүүр</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Тусламж</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Компани</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Request a Book Form */}
          <div className="lg:col-span-4">
            <div className="bg-background rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookPlus className="h-5 w-5 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Ном захиалах</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Хайж буй номоо олохгүй байна уу? Бидэнд хэлээрэй!
              </p>
              
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Send className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Баярлалаа!</p>
                  <p className="text-xs text-muted-foreground mt-1">Бид таны хүсэлтийг хүлээн авлаа.</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="request-name" className="text-xs text-muted-foreground">
                      Таны нэр
                    </Label>
                    <Input
                      id="request-name"
                      type="text"
                      placeholder="Нэрээ оруулна уу"
                      value={bookRequest.name}
                      onChange={(e) => setBookRequest({ ...bookRequest, name: e.target.value })}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="book-title" className="text-xs text-muted-foreground">
                      Номын нэр
                    </Label>
                    <Input
                      id="book-title"
                      type="text"
                      placeholder="Номын нэр оруулна уу"
                      value={bookRequest.bookTitle}
                      onChange={(e) => setBookRequest({ ...bookRequest, bookTitle: e.target.value })}
                      className="mt-1 h-9 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="book-author" className="text-xs text-muted-foreground">
                      Зохиолч (Заавал биш)
                    </Label>
                    <Input
                      id="book-author"
                      type="text"
                      placeholder="Зохиолчийн нэр оруулна уу"
                      value={bookRequest.author}
                      onChange={(e) => setBookRequest({ ...bookRequest, author: e.target.value })}
                      className="mt-1 h-9 text-sm"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-9 text-sm"
                  >
                    <Send className="h-3.5 w-3.5 mr-2" />
                    Илгээх
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Book Lovers Bookstore. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <p className="text-xs font-serif italic text-accent">
              Хайртайгаар, Book Lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
