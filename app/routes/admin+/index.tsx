import { Breadcrumbs } from "~/ui/layout/Breadcrumbs";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";

export default function AdminRoute() {

  return (
    <PageFrame>
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }]} />
      <PageHeader>Admin</PageHeader>
    </PageFrame>
  );
}
