"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              Сарын ном
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[1.1] text-balance">
              Түүхүүд амилдаг газар
            </h1>
            <p className="mt-3 text-base sm:text-lg font-serif italic text-accent">
              Номтой хамт өсөж, тантай хамт хөгжинө.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Бидний сонгон шилсэн уран зохиолуудыг нээж, дараагийн мартагдашгүй уншлагаа олоорой.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8" asChild>
                <Link href="/book/midnight-library">
                  Худалдаж авах
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                Цуглуулга үзэх
              </Button>
            </div>
          </div>

          {/* Featured Book */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Book Shadow */}
              <div className="absolute inset-0 bg-foreground/10 rounded-lg transform translate-x-4 translate-y-4" />
              {/* Book Cover */}
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[2/3] bg-card rounded-lg shadow-2xl overflow-hidden border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
                    Онцлох
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                    The Midnight Library
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    by Matt Haig
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? "text-accent fill-accent" : "text-muted-foreground"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="mt-4 text-lg font-semibold text-foreground">$16.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
