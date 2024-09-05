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
import db from "@/db/db";
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
  DeleteDropdownItem,
} from "./_components/CollectionActions";

export default function AdminCollectionsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Collections</PageHeader>
        <Button asChild>
          <Link href="/admin/collections/new">Add Collection</Link>
        </Button>
      </div>
      <CollectionsTable />
    </>
  )
};

async function CollectionsTable() {
  const collections = await db.collection.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  })

  if (collections.length === 0) return <p>No collections found</p>

  return (
      <section className="mt-6 relative">
        <div className="container mx-auto space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-0">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map(collection => (
                <TableRow key={collection.id}>
                  <TableCell>{collection.name}</TableCell>
                  <TableCell>{collection.description}</TableCell>
                  <TableCell>{formatNumber(collection._count.products)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/collections/${collection.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteDropdownItem
                          id={collection.id}
                          disabled={collection._count.products > 0}
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