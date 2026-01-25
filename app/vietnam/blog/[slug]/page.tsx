import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/layout";
import dbConnect from "@/lib/db/mongodb";
import { PageModel } from "@/lib/db/models/Page";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/components/blog/MarkdownComponents";

interface BlogPostPageProps {
  params: { slug: string };
}

// Get article from database
async function getArticle(slug: string) {
  await dbConnect();
  const article = await PageModel.findOne({
    slug,
    status: "published",
  }).lean();

  if (!article) {
    return null;
  }

  return {
    ...article,
    _id: article._id.toString(),
    createdAt: article.createdAt?.toISOString(),
    updatedAt: article.updatedAt?.toISOString(),
    publishedAt: article.publishedAt?.toISOString(),
  };
}

// Generate metadata
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: `/vietnam/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt || undefined,
      authors: [article.author],
      images: article.ogImage ? [{ url: article.ogImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Vietnam", href: "/vietnam" },
    { label: "Blog", href: "/vietnam/blog" },
    { label: article.title },
  ];

  // Format publish date
  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.destinationType && (
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {article.destinationType.charAt(0).toUpperCase() +
                  article.destinationType.slice(1)}
              </Badge>
            )}
            {article.region && (
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {article.region.charAt(0).toUpperCase() + article.region.slice(1)}{" "}
                Vietnam
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-emerald-100 mb-8">
            {article.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-emerald-100">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.contentMeta.readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/vietnam/blog"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Main Content - Render Markdown */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown components={markdownComponents}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Back to Top */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/vietnam/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
