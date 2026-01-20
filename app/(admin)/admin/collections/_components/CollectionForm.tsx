"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addCollection, updateCollection } from "../../_actions/collections";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Collection } from "@prisma/client";
import Image from "next/image";
import React from "react";

export function CollectionForm({ collection }: { collection?: Collection | null }) {
  const [error, action] = useActionState(
    collection == null ? addCollection : updateCollection.bind(null, collection.id),
    {}
  )

  return (
    <form action={action} className="space-y-8 p-8 lg:p-20">
      
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={collection?.name || ""}
        />
        {'name' in error && error.name && <div className="text-destructive text-sm">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={collection?.description}
        />
        {'description' in error && error.description && (
          <div className="text-destructive text-sm">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" accept="image/*" required={collection == null} />
        {collection != null && (
          <Image
            src={collection.imagePath}
            height="400"
            width="400"
            alt="Collection Image"
            className="rounded-md"
          />
        )}
        {'image' in error && error.image && <div className="text-destructive text-sm">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
};