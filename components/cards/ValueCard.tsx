import { Icon } from "@/components/ui/Icon";
import { ValueItem } from "@/lib/types";

export function ValueCard({ item }: { item: ValueItem }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <Icon name={item.icon} className="h-7 w-7 text-secondary" />
      <h3 className="mt-4 text-base font-archivo font-bold text-primary-text">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed font-ibm text-secondary-text">{item.description}</p>
    </div>
  );
}

export function InlineFeature({ item }: { item: ValueItem }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center bg-secondary/15 w-10 h-10 p-2 rounded-xs">
        <Icon name={item.icon} className=" text-on-secondary text-base" />
      </div>

      <div>
        <h4 className="text-base font-semibold font-archivo text-primary-text">{item.title}</h4>
        <p className="mt-1 text-sm font-ibm leading-relaxed text-secondary-text">{item.description}</p>
      </div>
    </div>
  );
}
