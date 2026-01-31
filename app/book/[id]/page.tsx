import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

// Sample book data - in a real app, this would come from a database
const books: Record<string, {
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
}> = {
  "midnight-library": {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.5,
    reviewCount: 2847,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets? A dazzling novel about all the choices that go into a life well lived.",
    coverColor: "#1a365d",
    category: "Fiction",
    inStock: true,
  },
  "atomic-habits": {
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    originalPrice: 21.99,
    rating: 5,
    reviewCount: 15234,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    coverColor: "#744210",
    category: "Self-Help",
    inStock: true,
  },
  "project-hail-mary": {
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 15.99,
    rating: 5,
    reviewCount: 8956,
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.",
    coverColor: "#2c5282",
    category: "Sci-Fi",
    inStock: true,
  },
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = books[id] || books["midnight-library"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ProductDetail {...book} />
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(books).map((id) => ({ id }))
}
