"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface BookCardProps {
  id?: string
  title: string
  author: string
  price: number
  rating: number
  coverColor: string
}

export function BookCard({ id, title, author, price, rating, coverColor }: BookCardProps) {
  const content = (
    <>
      {/* Book Cover */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: coverColor }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h3 className="font-serif text-lg font-medium text-white leading-tight drop-shadow-md line-clamp-3">
            {title}
          </h3>
          <p className="mt-2 text-xs text-white/80 drop-shadow-sm">
            {author}
          </p>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Сагсанд нэмэх
          </Button>
        </div>
      </div>
      
      {/* Book Info */}
      <div className="mt-4 space-y-1">
        <h3 className="font-medium text-foreground text-sm leading-tight line-clamp-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {author}
        </p>
        <div className="flex items-center justify-between pt-1">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-3 w-3 ${star <= rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          {/* Price */}
          <span className="text-sm font-semibold text-foreground">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  )

  if (id) {
    return (
      <Link href={`/book/${id}`} className="group relative block">
        {content}
      </Link>
    )
  }

  return <div className="group relative">{content}</div>
}
