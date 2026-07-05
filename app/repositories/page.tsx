import PageHeader from "@/components/PageHeader";
import RepoList from "@/components/RepoList";

export default function RepositoriesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <PageHeader
        kicker="Code"
        title="Repositories"
        dek="Pulled live from GitHub — public repositories, sorted by most recently updated."
      />
      <RepoList username="arataishikawa11" />
    </div>
  );
}
