import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type CollectionCardProps = {
  id: string
  name: string
  imagePath: string
};

export function CollectionCard({
  id,
  name,
  imagePath,
}: CollectionCardProps) {
  return (
    <Card className="group flex flex-col">
      <div className={"image-collection"}>
        <Image src={imagePath} alt={name} fill className={"image"} />
      </div>
      <div>
        <CardHeader>
          <CardTitle className="text-primary-foreground font-semibold text-[24px] self-center pt-[10px]">{name}</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <p className="line-clamp-1 font-medium text-[16px] text-secondary-foreground leading-10">{description}</p>
        </CardContent> */}
        {/* <CardFooter>
          <CardDescription className="text-primary-foreground font-semibold text-[20px]">{formatCurrency(priceInCents / 100)}</CardDescription>
        </CardFooter> */}
      </div>
    </Card>
  )
};

export function CollectionCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video h-[300px]" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-4 rounded-full" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full" />
        <div className="w-full h-4 rounded-full" />
        <div className="w-3/4 h-4 rounded-full" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
};