"use client"

import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  price: number
  rating: number
  coverColor: string
}

interface BookGridProps {
  title: string
  subtitle?: string
  books: Book[]
}

export function BookGrid({ title, subtitle, books }: BookGridProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <Button variant="ghost" className="text-accent hover:text-accent/80 self-start sm:self-auto gap-1 px-0">
            Бүгдийг үзэх
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              rating={book.rating}
              coverColor={book.coverColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
