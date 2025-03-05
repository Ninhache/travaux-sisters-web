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
      <main className="bg-base-200 min-h-screen">
        <div className="min-h-screen">
          <ForumHeader />

          <div className="container mx-auto flex flex-col gap-8 px-4 py-8 lg:flex-row">
            <aside className="lg:sticky lg:top-4 lg:w-1/4 lg:self-start">
              <CategoryMenu categories={mockCategories} />
            </aside>
            <main className="flex-1">
              <div className="container mx-auto px-4 pt-4">
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
