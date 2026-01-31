"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Package,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  Phone,
  CheckCircle2,
  Truck,
  Clock,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock inventory data
const initialInventory = [
  {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 14.99,
    stock: 45,
    category: "Fiction",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    stock: 120,
    category: "Non-Fiction",
  },
  {
    id: "3",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 13.99,
    stock: 32,
    category: "Fiction",
  },
  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 11.99,
    stock: 78,
    category: "Fiction",
  },
  {
    id: "5",
    title: "Educated",
    author: "Tara Westover",
    price: 15.99,
    stock: 25,
    category: "Non-Fiction",
  },
  {
    id: "6",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 18.99,
    stock: 56,
    category: "Science Fiction",
  },
  {
    id: "7",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    stock: 89,
    category: "Fiction",
  },
]

// Mock orders data
const initialOrders = [
  {
    id: "BL-20260129-001",
    customerName: "Sarah Johnson",
    phone: "96212100",
    items: 3,
    total: 45.97,
    paymentStatus: "paid" as const,
    shippingStatus: "shipped" as const,
    date: "2026-01-29",
  },
  {
    id: "BL-20260129-002",
    customerName: "Michael Chen",
    phone: "88838201",
    items: 2,
    total: 31.98,
    paymentStatus: "pending" as const,
    shippingStatus: "pending" as const,
    date: "2026-01-29",
  },
  {
    id: "BL-20260128-003",
    customerName: "Emma Wilson",
    phone: "95512345",
    items: 1,
    total: 16.99,
    paymentStatus: "paid" as const,
    shippingStatus: "pending" as const,
    date: "2026-01-28",
  },
  {
    id: "BL-20260128-004",
    customerName: "David Brown",
    phone: "99887766",
    items: 4,
    total: 62.96,
    paymentStatus: "pending" as const,
    shippingStatus: "pending" as const,
    date: "2026-01-28",
  },
  {
    id: "BL-20260127-005",
    customerName: "Lisa Anderson",
    phone: "91234567",
    items: 2,
    total: 28.98,
    paymentStatus: "paid" as const,
    shippingStatus: "shipped" as const,
    date: "2026-01-27",
  },
]

type PaymentStatus = "paid" | "pending"
type ShippingStatus = "shipped" | "pending"

interface Book {
  id: string
  title: string
  author: string
  price: number
  stock: number
  category: string
}

interface Order {
  id: string
  customerName: string
  phone: string
  items: number
  total: number
  paymentStatus: PaymentStatus
  shippingStatus: ShippingStatus
  date: string
}

export default function AdminDashboard() {
  const [inventory, setInventory] = useState<Book[]>(initialInventory)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "Fiction",
  })

  // Toggle payment status
  const togglePaymentStatus = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              paymentStatus:
                order.paymentStatus === "paid" ? "pending" : "paid",
            }
          : order
      )
    )
  }

  // Toggle shipping status
  const toggleShippingStatus = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              shippingStatus:
                order.shippingStatus === "shipped" ? "pending" : "shipped",
            }
          : order
      )
    )
  }

  // Delete book
  const deleteBook = (bookId: string) => {
    setInventory(inventory.filter((book) => book.id !== bookId))
  }

  // Add new book
  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.price && newBook.stock) {
      const book: Book = {
        id: Date.now().toString(),
        title: newBook.title,
        author: newBook.author,
        price: Number.parseFloat(newBook.price),
        stock: Number.parseInt(newBook.stock),
        category: newBook.category,
      }
      setInventory([...inventory, book])
      setNewBook({
        title: "",
        author: "",
        price: "",
        stock: "",
        category: "Fiction",
      })
      setIsAddDialogOpen(false)
    }
  }

  // Update book
  const handleUpdateBook = () => {
    if (editingBook) {
      setInventory(
        inventory.map((book) =>
          book.id === editingBook.id ? editingBook : book
        )
      )
      setEditingBook(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.jpg"
                  alt="Book Lovers Bookstore"
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <h1 className="hidden sm:block text-lg font-semibold text-foreground">
                Хянах самбар
              </h1>
            </div>
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Дэлгүүр рүү буцах
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-3">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Нийт ном</p>
                <p className="text-2xl font-semibold text-foreground">
                  {inventory.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-3">
                <ShoppingBag className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Нийт захиалга</p>
                <p className="text-2xl font-semibold text-foreground">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Төлсөн захиалга</p>
                <p className="text-2xl font-semibold text-foreground">
                  {orders.filter((o) => o.paymentStatus === "paid").length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-500/10 p-3">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Илгээсэн</p>
                <p className="text-2xl font-semibold text-foreground">
                  {orders.filter((o) => o.shippingStatus === "shipped").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Захиалгууд
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              Агуулах
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-semibold text-foreground">
                Захиалга удирдах
              </h2>
            </div>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Захиалгын дугаар</TableHead>
                    <TableHead>Хэрэглэгч</TableHead>
                    <TableHead>Утас</TableHead>
                    <TableHead>Барааны тоо</TableHead>
                    <TableHead>Нийт</TableHead>
                    <TableHead>Төлбөр</TableHead>
                    <TableHead>Хүргэлт</TableHead>
                    <TableHead className="text-right">Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.customerName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span className="font-medium text-foreground">
                            {order.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                          }
                        >
                          {order.paymentStatus === "paid" ? (
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {order.paymentStatus === "paid" ? "Төлсөн" : "Хүлээгдэж буй"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.shippingStatus === "shipped"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            order.shippingStatus === "shipped"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400"
                          }
                        >
                          {order.shippingStatus === "shipped" ? (
                            <Truck className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {order.shippingStatus === "shipped"
                            ? "Илгээсэн"
                            : "Хүлээгдэж буй"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePaymentStatus(order.id)}
                            className={`bg-transparent ${
                              order.paymentStatus === "paid"
                                ? "text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                                : "text-amber-600 hover:text-amber-700 border-amber-200 hover:border-amber-300 hover:bg-amber-50 dark:border-amber-800 dark:hover:bg-amber-900/20"
                            }`}
                          >
                            {order.paymentStatus === "paid"
                              ? "Төлөөгүй болгох"
                              : "Төлсөн болгох"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleShippingStatus(order.id)}
                            className={`bg-transparent ${
                              order.shippingStatus === "shipped"
                                ? "text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                                : "text-gray-600 hover:text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/20"
                            }`}
                          >
                            {order.shippingStatus === "shipped"
                              ? "Хүлээгдэж буй болгох"
                              : "Илгээсэн болгох"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-semibold text-foreground">
                Номын агуулах
              </h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Ном нэмэх
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-serif">
                      Шинэ ном нэмэх
                    </DialogTitle>
                    <DialogDescription>
                      Агуулахад нэмэх номын мэдээллийг оруулна уу.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Нэр</Label>
                      <Input
                        id="title"
                        value={newBook.title}
                        onChange={(e) =>
                          setNewBook({ ...newBook, title: e.target.value })
                        }
                        placeholder="Номын нэр оруулна уу"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="author">Зохиолч</Label>
                      <Input
                        id="author"
                        value={newBook.author}
                        onChange={(e) =>
                          setNewBook({ ...newBook, author: e.target.value })
                        }
                        placeholder="Зохиолчийн нэр оруулна уу"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Үнэ ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newBook.price}
                          onChange={(e) =>
                            setNewBook({ ...newBook, price: e.target.value })
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="stock">Үлдэгдэл</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newBook.stock}
                          onChange={(e) =>
                            setNewBook({ ...newBook, stock: e.target.value })
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Ангилал</Label>
                      <Select
                        value={newBook.category}
                        onValueChange={(value) =>
                          setNewBook({ ...newBook, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fiction">Уран зохиол</SelectItem>
                          <SelectItem value="Non-Fiction">
                            Нийтлэл
                          </SelectItem>
                          <SelectItem value="Science Fiction">
                            Шинжлэх ухаан
                          </SelectItem>
                          <SelectItem value="Mystery">Нууцлаг</SelectItem>
                          <SelectItem value="Romance">Романс</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="bg-transparent"
                    >
                      Цуцлах
                    </Button>
                    <Button
                      onClick={handleAddBook}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Ном нэмэх
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Нэр</TableHead>
                    <TableHead>Зохиолч</TableHead>
                    <TableHead>Ангилал</TableHead>
                    <TableHead>Үнэ</TableHead>
                    <TableHead>Үлдэгдэл</TableHead>
                    <TableHead className="text-right">Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {book.author}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.category}</Badge>
                      </TableCell>
                      <TableCell>${book.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            book.stock < 30
                              ? "text-amber-600 font-medium"
                              : "text-foreground"
                          }
                        >
                          {book.stock}
                        </span>
                        {book.stock < 30 && (
                          <span className="ml-2 text-xs text-amber-600">
                            Бага үлдэгдэл
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingBook(book)}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Засах</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-serif">
                                  Ном засах
                                </DialogTitle>
                                <DialogDescription>
                                  Номын мэдээллийг доор засна уу.
                                </DialogDescription>
                              </DialogHeader>
                              {editingBook && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-title">Нэр</Label>
                                    <Input
                                      id="edit-title"
                                      value={editingBook.title}
                                      onChange={(e) =>
                                        setEditingBook({
                                          ...editingBook,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-author">Зохиолч</Label>
                                    <Input
                                      id="edit-author"
                                      value={editingBook.author}
                                      onChange={(e) =>
                                        setEditingBook({
                                          ...editingBook,
                                          author: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-price">
                                        Үнэ ($)
                                      </Label>
                                      <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        value={editingBook.price}
                                        onChange={(e) =>
                                          setEditingBook({
                                            ...editingBook,
                                            price: Number.parseFloat(
                                              e.target.value
                                            ),
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-stock">Үлдэгдэл</Label>
                                      <Input
                                        id="edit-stock"
                                        type="number"
                                        value={editingBook.stock}
                                        onChange={(e) =>
                                          setEditingBook({
                                            ...editingBook,
                                            stock: Number.parseInt(
                                              e.target.value
                                            ),
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingBook(null)}
                                  className="bg-transparent"
                                >
                                  Цуцлах
                                </Button>
                                <Button
                                  onClick={handleUpdateBook}
                                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                  Өөрчлөлт хадгалах
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => deleteBook(book.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Устгах</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
