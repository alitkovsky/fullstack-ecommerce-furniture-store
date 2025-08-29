"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import {
  deleteCollection,
} from "../../_actions/collections";
import { useRouter } from "next/navigation";
import React from "react";

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string
  disabled: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCollection(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
};