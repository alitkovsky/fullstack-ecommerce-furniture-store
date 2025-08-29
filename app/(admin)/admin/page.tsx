import React from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";

 import { prisma } from "@/lib/prisma";
 import { formatCurrency, formatNumber } from "@/lib/formatters";

 async function getSalesData() {
   const data = await prisma.order.aggregate({
     _sum: { totalPrice: true },
     _count: true,
   })

   return {
     amount: ((data._sum?.totalPrice || 0) / 100),
     numberOfSales: data._count,
   }
 }

 async function getUserData() {
   const [userCount, orderData] = await Promise.all([
     prisma.user.count(),
     prisma.order.aggregate({
       _sum: { totalPrice: true },
     }),
   ])

   return {
     userCount,
     averageValuePerUser:
       userCount === 0
         ? 0
         : (orderData._sum.totalPrice || 0) / userCount / 100,
   }
 }

 async function getProductData() {
   const [activeCount, inactiveCount] = await Promise.all([
     prisma.product.count({ where: { isAvailableForPurchase: true } }),
     prisma.product.count({ where: { isAvailableForPurchase: false } }),
   ])

   return { activeCount, inactiveCount }
 }

 export default async function AdminDashboard() {
   const [salesData, userData, productData] = await Promise.all([
     getSalesData(),
     getUserData(),
     getProductData(),
   ])

   return (
    <section className="p-8 lg:p-20 relative">
      <div className="container mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Sales"
            subtitle={`${formatNumber(salesData.numberOfSales || 0)} Orders`}
            body={formatCurrency(salesData.amount)}
          />
          <DashboardCard
            title="Customers"
            subtitle={`${formatCurrency(
              userData.averageValuePerUser
            )} Average Value`}
            body={formatNumber(userData.userCount)}
          />
          <DashboardCard
            title="Active Products"
            subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
            body={formatNumber(productData.activeCount)}
          />
        </div>
      </div>
    </section>
   )
 }

 type DashboardCardProps = {
   title: string
   subtitle: string
   body: string
 }

 function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
   return (
     <Card>
       <CardHeader>
         <CardTitle>{title}</CardTitle>
         <CardDescription>{subtitle}</CardDescription>
       </CardHeader>
       <CardContent>
         <p>{body}</p>
       </CardContent>
     </Card>
   )
 };