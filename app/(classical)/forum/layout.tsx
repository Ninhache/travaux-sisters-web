import CategoryMenu from "@/components/forum/categories/category-menu";
import ForumBreadcrumbs from "@/components/forum/forum-breadcrumbs";
import ForumHeader from "@/components/forum/threads/forum-header";
import { getCategories } from "@/lib/api/category";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <>
      <main className="min-h-screen">
        <ForumHeader />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-8 lg:flex-row">
          <aside className="lg:sticky lg:top-4 lg:w-1/3 lg:self-start">
            <CategoryMenu categories={categories} />
          </aside>
          <main className="w-full flex-1">
            {/* <div className="px-4 pt-4">
              <ForumBreadcrumbs />
            </div>
            <div className="divider" /> */}
            {children}
          </main>
        </div>
      </main>
    </>
  );
}
