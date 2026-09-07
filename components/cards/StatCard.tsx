import { StatItem } from "@/lib/types";

export function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="rounded-lg border border-border bg-card px-6 py-5 shadow-md max-w-47 sm:max-w-61.5">
      <p className="font-archivo text-3xl font-extrabold text-primary-text">{stat.value}</p>
      <p className="mt-1 text-sm font-ibm text-secondary-text">{stat.label}</p>
    </div>
  );
}
