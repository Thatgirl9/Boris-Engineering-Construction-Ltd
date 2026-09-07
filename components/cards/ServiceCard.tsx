import { Icon } from "@/components/ui/Icon";
import { ServiceItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ServiceCard({
  service,
  index,
  showDetails = false,
}: {
  service: ServiceItem;
  index?: number;
  showDetails?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-lg transition-shadow hover:shadow-md group",
        showDetails && "relative"
      )}
    >
      {showDetails && typeof index === "number" ? (
        <span className="absolute right-6 top-6 font-archivo text-3xl font-bold text-border">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <div className={`flex h-12 w-12 items-center justify-center rounded-md bg-primary text-on-primary ${!showDetails && "group-hover:bg-secondary group-hover:text-on-secondary "} `}>
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold font-archivo text-primary-text">{service.title}</h3>
      <p className="mt-2 text-sm font-ibm leading-relaxed text-secondary-text">{service.description}</p>
      {showDetails ? (
        <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-secondary-text">
          {service.details.map((d) => (
            <li key={d} className="flex items-start gap-2 font-ibm text-sm">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {d}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
