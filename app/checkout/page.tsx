"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Check, Package, User, MapPin } from "lucide-react"

interface OrderItem {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  coverColor: string
}

const orderItems: OrderItem[] = [
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

const steps = [
  { id: 1, name: "Сагс", icon: Package },
  { id: 2, name: "Хүргэлт", icon: MapPin },
  { id: 3, name: "Баталгаажуулалт", icon: Check },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate order ID and redirect
    const orderId = `BL-${Date.now().toString(36).toUpperCase()}`
    router.push(`/checkout/confirmation?orderId=${orderId}`)
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  const isFormValid = formData.name && formData.phone && formData.address && formData.city

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <nav aria-label="Progress">
              <ol className="flex items-center justify-center gap-4 sm:gap-8">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center">
                    <div className="flex items-center">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          step.id < 2
                            ? "border-accent bg-accent text-accent-foreground"
                            : step.id === 2
                            ? "border-accent text-accent"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {step.id < 2 ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </span>
                      <span
                        className={`ml-3 text-sm font-medium hidden sm:block ${
                          step.id <= 2 ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={`ml-4 sm:ml-8 h-0.5 w-8 sm:w-16 ${
                          step.id < 2 ? "bg-accent" : "bg-border"
                        }`}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
              Хүргэлтийн мэдээлэл
            </h1>
            <p className="mt-2 text-muted-foreground">
              Захиалгаа дуусгахын тулд мэдээллээ оруулна уу
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Shipping Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-xl font-medium text-foreground">
                      Холбоо барих мэдээлэл
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="name" className="text-foreground">
                        Бүтэн нэр <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Бүтэн нэрээ оруулна уу"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone" className="text-foreground">
                        Утасны дугаар <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="Утасны дугаараа оруулна уу"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-xl font-medium text-foreground">
                      Хүргэх хаяг
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address" className="text-foreground">
                        Хаяг <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        required
                        placeholder="Байр, гудамжны нэр"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-foreground">
                        Хот / Дүүрэг <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="Хот / Дүүрэг оруулна уу"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-foreground">
                        Тэмдэглэл (Заавал биш)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Хүргэлттэй холбоотой тусгай заавар..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="mt-1.5 min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Submit Button */}
                <div className="lg:hidden">
                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    size="lg"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Боловсруулж байна..."
                    ) : (
                      <>
                        Захиалга өгөх
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Back to Cart */}
                <div className="pt-4">
                  <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href="/cart">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Сагс руу буцах
                    </Link>
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="font-serif text-xl font-medium text-foreground mb-6">
                  Захиалгын дэлгэрэнгүй
                </h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div
                        className="w-12 h-16 rounded-md shadow-sm flex-shrink-0"
                        style={{ backgroundColor: item.coverColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.author}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Тоо ширхэг: {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дүн</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Хүргэлт</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "Үнэгүй" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between text-lg font-medium">
                  <span className="text-foreground">Нийт</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>

                {/* Desktop Submit Button */}
                <Button
                  type="submit"
                  form="checkout-form"
                  className="hidden lg:flex w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                  size="lg"
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    "Боловсруулж байна..."
                  ) : (
                    <>
                      Захиалга өгөх
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Gift Note */}
                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎁</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Бэлэг орсон</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Энэ захиалгад хөөрхөн тэмдэглэгээ дагалдана!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
