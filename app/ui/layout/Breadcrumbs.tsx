import { Link } from "~/ui/remix";

export type BreadcrumbsItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbsItem[] }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link to={item.href} className="text-gray-800">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
