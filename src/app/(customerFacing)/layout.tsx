import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-col w-full mx-auto overflow-hidden min-h-svh">
      <Header
        id=""
        name=""
        priceInCents={0}
        description=""
        imagePath=""
      />
      {children}
    </main>
  )
};