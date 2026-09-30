import type { TFunction } from "./i18n";

export interface NavStep {
  text: string;
  icon: "straight" | "turn-left" | "turn-right" | "elevator" | "stairs" | "finish";
}

/** The only node fields the direction generator needs (works for saved and draft nodes). */
export interface NavPoint {
  x: number;
  y: number;
  name?: string;
  floorId: string;
  type?: "normal" | "entrance" | "elevator" | "stairs";
}

// Direction of the turn made at p2 when walking p1 -> p2 -> p3.
function getTurnDirection(p1: NavPoint, p2: NavPoint, p3: NavPoint): "left" | "right" | "straight" {
  const v1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

  // 2D cross product tells us which way we turn
  const crossProduct = v1.x * v2.y - v1.y * v2.x;

  // angle between the two segments
  const dotProduct = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  const angle = Math.acos(Math.min(1, Math.max(-1, dotProduct / (mag1 * mag2)))) * (180 / Math.PI);

  if (angle < 25) return "straight"; // a small deviation counts as going straight
  return crossProduct > 0 ? "right" : "left";
}

// Builds the written directions, in the language of the `t` function that is passed in.
// Distances are intentionally not measured in meters: the route distance is the number of nodes passed.
export function generateNavigationSteps(pathNodes: NavPoint[], t: TFunction): NavStep[] {
  if (!pathNodes || pathNodes.length < 2) return [];

  const steps: NavStep[] = [];
  const label = (name: string | undefined, fallbackKey: string) => (name?.trim() ? name : t(fallbackKey));

  // First step: where to start
  steps.push({
    text: t("steps.start", { name: label(pathNodes[0].name, "steps.startPoint") }),
    icon: "straight",
  });

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const curr = pathNodes[i];
    const next = pathNodes[i + 1];

    // 1. Changing floors (elevator / stairs)
    if (curr.floorId !== next.floorId) {
      if (next.type === "elevator" || curr.type === "elevator") {
        steps.push({ text: t("steps.elevator"), icon: "elevator" });
      } else {
        steps.push({ text: t("steps.stairs"), icon: "stairs" });
      }
      continue;
    }

    // 2. Direction based on the upcoming move
    if (i < pathNodes.length - 2) {
      const future = pathNodes[i + 2];

      // If the next move changes floor, the floor-change step above handles it
      if (next.floorId === future.floorId) {
        const turn = getTurnDirection(curr, next, future);
        const name = label(next.name, "steps.nextPoint");

        if (turn === "right") {
          steps.push({ text: t("steps.right", { name }), icon: "turn-right" });
        } else if (turn === "left") {
          steps.push({ text: t("steps.left", { name }), icon: "turn-left" });
        } else {
          steps.push({ text: t("steps.straight", { name }), icon: "straight" });
        }
      }
    } else {
      // Last step before arriving
      steps.push({
        text: t("steps.finish", { name: label(next.name, "steps.destinationPoint") }),
        icon: "finish",
      });
    }
  }

  return steps;
}
