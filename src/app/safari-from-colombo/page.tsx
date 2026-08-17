import { RouteTemplate } from "@/components/route-template";
import { routes } from "@/lib/content";

const info = routes.find((r) => r.slug === "safari-from-colombo")!;


export default () => <RouteTemplate info={info} />;
