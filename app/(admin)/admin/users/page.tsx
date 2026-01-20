import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { prisma } from "@/lib/prisma";
 import { formatCurrency, formatNumber } from "@/lib/formatters";
 import { PageHeader } from "../_components/PageHeader";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { MoreVertical } from "lucide-react";
 import { DeleteDropDownItem } from "./_components/UserActions";
import React from "react";
 function getUsers() {
   return prisma.user.findMany({
     select: {
       id: true,
       email: true,
       orders: { select: { totalPrice: true } },
       createdAt: true,
     },
     orderBy: { createdAt: "desc" },
   })
 }

 export default function UsersPage() {
   return (
     <>
        <div className="p-8 lg:p-20 gap-4">
          <PageHeader>Customers</PageHeader>
        </div>
        <UsersTable />
     </>
        )
 }

async function UsersTable() {
   const users: {
     id: string;
     email: string | null;
     orders: { totalPrice: number }[];
     createdAt: Date;
   }[] = await getUsers()

   if (users.length === 0) return <p className="p-8 lg:p-20 text-center text-2xl font-normal">No customers found</p>

   return (
    <section className="relative">
      <div className="container mx-auto space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatNumber(user.orders.length)}</TableCell>
                <TableCell>
                  {formatCurrency(
                    user.orders.reduce((sum, o) => o.totalPrice + sum, 0) /
                      100
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DeleteDropDownItem id={user.id} />
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
