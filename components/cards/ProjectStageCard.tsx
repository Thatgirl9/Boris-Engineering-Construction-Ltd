import { ProjectStage } from "@/lib/types";

export function ProjectStageCard({ stage, index }: { stage: ProjectStage; index: number }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
        {index + 1}
      </span>
      <div>
        <h3 className="text-base font-bold text-primary-text">{stage.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-secondary-text">{stage.description}</p>
      </div>
    </div>
  );
};