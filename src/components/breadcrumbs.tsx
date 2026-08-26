import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.udawalawe-wild.com/",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: "https://www.udawalawe-wild.com" + item.url,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-muted-foreground flex gap-2 overflow-x-auto whitespace-nowrap"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        {items.map((item, i) => (
          <span key={item.url} className="flex gap-2">
            <span>/</span>
            {i === items.length - 1 ? (
              <span className="text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
