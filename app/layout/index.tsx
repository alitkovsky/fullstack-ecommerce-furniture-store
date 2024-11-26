import React from "react"
import Footer from "@/app/layout/Footer"
import Navbar from "@/app/layout/Navbar"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;
