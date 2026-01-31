"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  coverColor: string
}

const initialCartItems: CartItem[] = [
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    quantity: 1,
    coverColor: "#234e52",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    quantity: 2,
    coverColor: "#744210",
  },
  {
    id: "silent-patient",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 14.99,
    quantity: 1,
    coverColor: "#2d3748",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
              Shopping Cart
            </h1>
            <p className="mt-2 text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-4 font-serif text-2xl text-foreground">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Start adding some books to your collection!</p>
              <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/">Browse Books</Link>
              </Button>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 sm:gap-6 p-4 bg-card rounded-lg border border-border">
                      {/* Book Cover */}
                      <Link href={`/book/${item.id}`} className="shrink-0">
                        <div
                          className="w-20 h-28 sm:w-24 sm:h-32 rounded-md shadow-md flex items-end justify-center overflow-hidden"
                          style={{ backgroundColor: item.coverColor }}
                        >
                          <div className="w-full h-2/3 bg-white/10 backdrop-blur-sm p-2">
                            <div className="h-1 w-8 bg-white/40 rounded mb-1" />
                            <div className="h-1 w-12 bg-white/30 rounded" />
                          </div>
                        </div>
                      </Link>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <Link href={`/book/${item.id}`} className="hover:text-accent transition-colors">
                            <h3 className="font-serif text-lg font-medium text-foreground truncate">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.author}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href="/">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5 mt-8 lg:mt-0">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="font-serif text-xl font-medium text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $50
                      </p>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    asChild
                    className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                    size="lg"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Gift Note */}
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎁</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">Gift Included</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Every order includes a cute bookmark!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
