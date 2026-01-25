import { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import dbConnect from "@/lib/db/mongodb";
import { PageModel } from "@/lib/db/models/Page";

export const metadata: Metadata = {
  title: "Vietnam Travel Blog | Guides, Tips & Stories",
  description:
    "Read our comprehensive Vietnam travel guides, destination tips, and insider stories. Expert advice for planning your perfect Vietnam adventure.",
  openGraph: {
    title: "Vietnam Travel Blog | Guides, Tips & Stories",
    description:
      "Comprehensive Vietnam travel guides and expert tips for your adventure.",
    url: "/vietnam/blog",
  },
};

// Fetch published articles
async function getPublishedArticles() {
  await dbConnect();
  const articles = await PageModel.find({ status: "published" })
    .select(
      "_id slug title excerpt contentMeta destinationType region publishedAt createdAt"
    )
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(50)
    .lean();

  return articles.map((article) => ({
    ...article,
    _id: article._id.toString(),
    createdAt: article.createdAt?.toISOString(),
    publishedAt: article.publishedAt?.toISOString(),
  }));
}

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Blog" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Vietnam Travel Blog
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            Comprehensive guides, insider tips, and expert advice for planning your
            perfect Vietnam adventure.
          </p>
        </div>
      </section>

      {/* Articles Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-600">
          {articles.length} article{articles.length !== 1 ? "s" : ""} published
        </p>
      </div>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No articles published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const publishDate = article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

              return (
                <article
                  key={article._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Category Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.destinationType && (
                        <Badge variant="outline" className="capitalize">
                          {article.destinationType}
                        </Badge>
                      )}
                      {article.region && (
                        <Badge variant="outline" className="capitalize">
                          {article.region}
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link
                        href={`/vietnam/blog/${article.slug}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{publishDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.contentMeta.readingTime} min</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/vietnam/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
