import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        {children}
      </main>
      <Footer/>
    </>
  );
}
