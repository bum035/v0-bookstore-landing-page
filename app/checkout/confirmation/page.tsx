"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Copy, Phone, ArrowRight, Package, MapPin, Heart } from "lucide-react"
import { useState, Suspense } from "react"

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

const bankInfo = {
  bankName: "Book Lovers Bank",
  accountName: "Book Lovers Bookstore Co., Ltd.",
  accountNumber: "123-456-7890",
  branch: "Main Branch",
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "BL-XXXXXX"
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <nav aria-label="Progress">
              <ol className="flex items-center justify-center gap-4 sm:gap-8">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center">
                    <div className="flex items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-accent text-accent-foreground">
                        <Check className="h-5 w-5" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-foreground hidden sm:block">
                        {step.name}
                      </span>
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div className="ml-4 sm:ml-8 h-0.5 w-8 sm:w-16 bg-accent" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-6">
              <Check className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground mb-4">
              Баярлалаа!
            </h1>
            <p className="font-serif text-xl sm:text-2xl italic text-accent mb-2">
              Хайртайгаар, Book Lovers
            </p>
            <p className="text-muted-foreground mt-4">
              Таны захиалга амжилттай хүлээн авлаа
            </p>
          </div>

          {/* Order ID Card */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Захиалгын дугаар</p>
                <p className="font-mono text-2xl font-semibold text-foreground">{orderId}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent"
                onClick={() => copyToClipboard(orderId, "orderId")}
              >
                {copiedField === "orderId" ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-accent" />
                    Хуулагдсан
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Дугаар хуулах
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-serif text-xl font-medium text-foreground mb-4">
              Төлбөрийн заавар
            </h2>
            <p className="text-muted-foreground mb-6">
              Дараах дансанд нийт дүнг шилжүүлж, Захиалгын дугаараа тайлбар хэсэгт оруулна уу.
            </p>

            <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Банкны нэр</p>
                  <p className="text-foreground font-medium">{bankInfo.bankName}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Дансны нэр</p>
                  <p className="text-foreground font-medium">{bankInfo.accountName}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Дансны дугаар</p>
                  <p className="text-foreground font-medium font-mono text-lg">{bankInfo.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankInfo.accountNumber, "accountNumber")}
                >
                  {copiedField === "accountNumber" ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Салбар</p>
                  <p className="text-foreground font-medium">{bankInfo.branch}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Нийт дүн</p>
                  <p className="text-accent font-semibold text-2xl">${total.toFixed(2)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(total.toFixed(2), "amount")}
                >
                  {copiedField === "amount" ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground">
                <strong>Анхаарах:</strong> Захиалгаа хурдан боловсруулахын тулд Захиалгын дугаар ({orderId})-аа шилжүүлгийн утгад заавал бичнэ үү.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-serif text-xl font-medium text-foreground mb-6">
              Захиалгын дэлгэрэнгүй
            </h2>

            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div
                    className="w-14 h-20 rounded-md shadow-sm flex-shrink-0"
                    style={{ backgroundColor: item.coverColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Тоо ширхэг: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
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
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-medium">
                <span className="text-foreground">Нийт</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

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

          {/* Contact Support */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-serif text-xl font-medium text-foreground mb-4">
              Асуух зүйл байна уу?
            </h2>
            <p className="text-muted-foreground mb-6">
              Бидний баг танд туслахад бэлэн байна. Санаа зоволтгүй холбогдоорой!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:96212100"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-5 w-5 text-accent" />
                <span className="font-mono text-lg font-medium text-foreground">96212100</span>
              </a>
              <a
                href="tel:88838201"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Phone className="h-5 w-5 text-accent" />
                <span className="font-mono text-lg font-medium text-foreground">88838201</span>
              </a>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              <Link href="/">
                Дэлгүүр үргэлжлүүлэх
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-1">
              Биднээс худалдан авсанд баярлалаа <Heart className="h-4 w-4 text-accent inline" />
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Ачаалж байна...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
