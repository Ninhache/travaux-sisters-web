import Header from "@/components/common/header";
import CategoryMenu from "@/components/forum/categories/category-menu";
import ForumBreadcrumbs from "@/components/forum/forum-breadcrumbs";
import ForumHeader from "@/components/forum/threads/forum-header";
import { mockCategories } from "@/lib/mock-data";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen bg-base-200">
        <div className="min-h-screen">
          <ForumHeader />

          <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
              <CategoryMenu categories={mockCategories} />
            </aside>
            <main className="flex-1">
              <div className="container mx-auto px-4 pt-4 ">
                <ForumBreadcrumbs />
              </div>
              <div className="divider" />
              {children}
            </main>
          </div>
        </div>
      </main>
    </>
  );
}
