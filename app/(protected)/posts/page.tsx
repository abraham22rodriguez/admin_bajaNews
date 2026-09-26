import { adminFetch } from "@/lib/adminApi";
import { getSession } from "@/lib/session";
import { ModuleCard } from "@/components/ModuleCard";
import { FlashBanner } from "@/components/FlashBanner";
import { PostsTable } from "@/components/posts/PostsTable";
import { Pagination } from "@/components/Pagination";
import type { PagedResult, PostListItem } from "@/types/post";

export default async function PostsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; ok?: string; error?: string }>;
}) {
  const { page: pageParam, ok, error } = await searchParams;
  const page = Number(pageParam ?? 1) || 1;
  const session = await getSession();

  const result = await adminFetch<PagedResult<PostListItem>>(
    `/api/admin/posts?page=${page}&pageSize=10`
  );

  return (
    <ModuleCard title="Noticias generales" subtitle="Todas las notas publicadas por la redacción">
      <FlashBanner ok={ok} error={error} />
      <PostsTable
        posts={result.items}
        returnTo="/posts"
        roles={session?.user.roles ?? []}
        currentUserId={session?.user.id ?? -1}
      />
      <div className="border-t" style={{ borderColor: "var(--color-line)" }}>
        <Pagination page={result.page} totalPages={result.totalPages} basePath="/posts" />
      </div>
    </ModuleCard>
  );
}
