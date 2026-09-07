import {
  Building2,
  HardHat,
  Hammer,
  Grid3x3,
  Layers,
  ClipboardList,
  Wrench,
  CheckCircle2,
  UserCog,
  MessagesSquare,
  Clock,
  ShieldCheck,
  Link2,
  User,
  Target,
  Eye,
  Handshake,
  Star,
  Medal,
  Lightbulb,
  BadgeCheck,
  ShieldAlert,
  FileText,
  Compass,
  CloudCog,
  Smartphone,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const ICONS: Record<IconName, LucideIcon> = {
  building: Building2,
  civil: HardHat,
  renovation: Hammer,
  tiling: Grid3x3,
  concrete: Layers,
  management: ClipboardList,
  maintenance: Wrench,
  check: CheckCircle2,
  professional: UserCog,
  message: MessagesSquare,
  clock: Clock,
  shield: ShieldCheck,
  link: Link2,
  user: User,
  target: Target,
  eye: Eye,
  handshake: Handshake,
  star: Star,
  medal: Medal,
  bulb: Lightbulb,
  quality: BadgeCheck,
  safety: ShieldAlert,
  report: FileText,
  compass: Compass,
  cloud: CloudCog,
  devices: Smartphone,
  heartHandshake: HeartHandshake,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
