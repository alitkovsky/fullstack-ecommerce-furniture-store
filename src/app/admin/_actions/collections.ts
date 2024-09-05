"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addCollection(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/collections", { recursive: true })
  const imagePath = `/collections/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.collection.create({
    data: {
      name: data.name,
      description: data.description,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/collections")

  redirect("/admin/collections")
};

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
})

export async function updateCollection(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const collection = await db.collection.findUnique({ where: { id } })

  if (collection == null) return notFound()

  let imagePath = collection.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${collection.imagePath}`)
    imagePath = `/collections/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }

  await db.collection.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imagePath,
    },
  })

  revalidatePath("/")
  revalidatePath("/collections")

  redirect("/admin/collections")
};

export async function deleteCollection(id: string) {
  const collection = await db.collection.delete({ where: { id } })

  if (collection == null) return notFound()

  await fs.unlink(`public${collection.imagePath}`)

  revalidatePath("/")
  revalidatePath("/collections")
};