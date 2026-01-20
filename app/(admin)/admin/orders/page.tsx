import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { prisma } from "@/lib/prisma";
 import { formatCurrency } from "@/lib/formatters";
 import { PageHeader } from "../_components/PageHeader";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { MoreVertical } from "lucide-react";
 import { DeleteDropDownItem } from "./_components/OrderActions";
import React from "react";

type OrderRow = {
  id: string;
  totalPrice: number;
  userId: string;
  items: {
    quantity: number;
    price: number;
    product: { name: string };
  }[];
  createdAt: Date;
  user: { id: string; email: string } | null;
};

async function getOrders() {
  // First get all orders with basic data
  const orders: Omit<OrderRow, "user">[] = await prisma.order.findMany({
    select: {
      id: true,
      totalPrice: true,
      userId: true,
      items: {
        select: {
          quantity: true,
          price: true,
          product: { select: { name: true } }
        }
      },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  // Then get user data separately to handle orphaned orders
  const userIds = [...new Set(orders.map(order => order.userId))]
  const users: { id: string; email: string | null }[] = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, email: true }
  })

  const userMap = new Map(users.map(user => [user.id, user]))

  // Combine the data
  return orders.map(order => ({
    ...order,
    user: userMap.get(order.userId) || null
  }))
}

export default function OrdersPage() {
   return (
    <>
      <div className="p-8 lg:p-20 gap-4">
        <PageHeader>Sales</PageHeader>
      </div>
        <OrdersTable />
    </>
   )
}

async function OrdersTable() {
   const orders = await getOrders()

   if (orders.length === 0) return <p className="p-8 lg:p-20 text-center text-2xl font-normal">No sales found</p>

   return (
     <section className="relative">
        <div className="container mx-auto space-y-4">
     <Table>
       <TableHeader>
         <TableRow>
           <TableHead>Product</TableHead>
           <TableHead>Customer</TableHead>
           <TableHead>Price Paid</TableHead>
           <TableHead className="w-0">
             <span className="sr-only">Actions</span>
           </TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {orders.map(order => (
           <TableRow key={order.id}>
             <TableCell>
               {order.items.length > 1 
                 ? `${order.items.length} items` 
                 : order.items[0]?.product.name || "No items"
               }
               {order.items.length > 1 && (
                 <div className="text-sm text-gray-500">
                   {order.items.map((item, index) => (
                     <div key={index}>
                       {item.product.name} (x{item.quantity})
                     </div>
                   ))}
                 </div>
               )}
             </TableCell>
            <TableCell>{order.user?.email || 'Unknown User'}</TableCell>
             <TableCell>
               {formatCurrency(order.totalPrice / 100)}
             </TableCell>
             <TableCell className="text-center">
               <DropdownMenu>
                 <DropdownMenuTrigger>
                   <MoreVertical />
                   <span className="sr-only">Actions</span>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent>
                   <DeleteDropDownItem id={order.id} />
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
