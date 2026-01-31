"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Gift, Minus, Plus, Bookmark } from "lucide-react"

interface ProductDetailProps {
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  description: string
  coverColor: string
  category: string
  inStock: boolean
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${star <= rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} ({reviewCount} reviews)
      </span>
    </div>
  )
}

export function ProductDetail({
  title,
  author,
  price,
  originalPrice,
  rating,
  reviewCount,
  description,
  coverColor,
  category,
  inStock,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Book Cover - Left Column */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-4 translate-y-4" />
            {/* Book Cover */}
            <div 
              className="relative w-72 sm:w-80 lg:w-96 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden border border-border"
              style={{ backgroundColor: coverColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight drop-shadow-lg">
                  {title}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 drop-shadow-md">
                  {author}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Right Column */}
        <div className="flex flex-col">
          {/* Category Badge */}
          <Badge variant="secondary" className="w-fit mb-4">
            {category}
          </Badge>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-tight text-balance">
            {title}
          </h1>

          {/* Author */}
          <p className="mt-3 text-lg text-muted-foreground">
            by <span className="text-foreground font-medium">{author}</span>
          </p>

          {/* Rating */}
          <div className="mt-4">
            <StarRating rating={rating} reviewCount={reviewCount} />
          </div>

          <Separator className="my-6" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <Badge className="bg-accent text-accent-foreground">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-3">
            {inStock ? (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-sm text-destructive font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={decrementQuantity}
                className="p-2 hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-foreground min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              disabled={!inStock}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Basket
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`gap-2 bg-transparent ${isWishlisted ? "border-accent text-accent" : "border-border"}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-accent" : ""}`} />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>

          {/* Gift Offer */}
          <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Gift className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span>Gift Included</span>
                  <Bookmark className="h-4 w-4 text-accent" />
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  You will receive a cute bookmark with this book!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
