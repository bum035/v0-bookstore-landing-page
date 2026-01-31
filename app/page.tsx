import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BookGrid } from "@/components/book-grid"
import { Footer } from "@/components/footer"

const trendingBooks = [
  {
    id: "silent-patient",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 14.99,
    rating: 5,
    coverColor: "#2d3748",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    rating: 5,
    coverColor: "#744210",
  },
  {
    id: "crawdads-sing",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 13.99,
    rating: 4,
    coverColor: "#22543d",
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 11.99,
    rating: 5,
    coverColor: "#553c9a",
  },
  {
    id: "educated",
    title: "Educated",
    author: "Tara Westover",
    price: 15.99,
    rating: 4,
    coverColor: "#702459",
  },
]

const bestsellerBooks = [
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 18.99,
    rating: 5,
    coverColor: "#1a365d",
  },
  {
    id: "thursday-murder-club",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    price: 12.99,
    rating: 4,
    coverColor: "#7b341e",
  },
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    rating: 5,
    coverColor: "#234e52",
  },
  {
    id: "klara-and-the-sun",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: 17.99,
    rating: 4,
    coverColor: "#44337a",
  },
  {
    id: "vanishing-half",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    price: 14.99,
    rating: 5,
    coverColor: "#97266d",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BookGrid
          title="Trending Now"
          subtitle="Discover what everyone is reading this week"
          books={trendingBooks}
        />
        <div className="border-t border-border" />
        <BookGrid
          title="Bestsellers"
          subtitle="Our most popular titles of all time"
          books={bestsellerBooks}
        />
      </main>
      <Footer />
    </div>
  )
}
