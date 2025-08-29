import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "./_components/ProductActions";
// Note: Updated to use enhanced database schema with furniture-specific fields
import React from "react";

export default function AdminProductsPage() {
  return (
    <>
      <div className="p-8 lg:p-20 flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild className="bg-ochre text-white hover:bg-ochre/80 size-2">
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  )
};

async function ProductsTable() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      collectionIDs: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orderItems: true } }, // Fixed field name
    },
    orderBy: { name: "asc" },
  })

  if (products.length === 0) return <p>No products found</p>

  return (
      <section className="relative">
        <div className="container mx-auto space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-0">
                  <span className="sr-only">Available For Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.isAvailableForPurchase ? (
                      <>
                        <span className="sr-only">Available</span>
                        <CheckCircle2 />
                      </>
                    ) : (
                      <>
                        <span className="sr-only">Unavailable</span>
                        <XCircle className="stroke-destructive" />
                      </>
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.collectionIDs?.join(', ') || 'None'}</TableCell>
                  <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                  <TableCell>{formatNumber(product._count.orderItems)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <a download href={`/admin/products/${product.id}/download`}>
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <ActiveToggleDropdownItem
                          id={product.id}
                          isAvailableForPurchase={product.isAvailableForPurchase}
                        />
                        <DropdownMenuSeparator />
                        <DeleteDropdownItem
                          id={product.id}
                          disabled={product._count.orderItems > 0}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
  )
};