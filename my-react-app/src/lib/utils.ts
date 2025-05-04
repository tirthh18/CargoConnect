import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/routeOptimizer.ts
type Location = { lat: number; lng: number; index: number };

export function nearestNeighbor(locations: Location[]): number[] {
  if (locations.length === 0) return [];

  const visited: boolean[] = Array(locations.length).fill(false);
  const route: number[] = [];

  let currentIndex = 0;
  visited[currentIndex] = true;
  route.push(currentIndex);

  for (let step = 1; step < locations.length; step++) {
    let nearestIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < locations.length; i++) {
      if (!visited[i]) {
        const dx = locations[i].lat - locations[currentIndex].lat;
        const dy = locations[i].lng - locations[currentIndex].lng;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }
    }

    if (nearestIndex !== -1) {
      visited[nearestIndex] = true;
      route.push(nearestIndex);
      currentIndex = nearestIndex;
    }
  }

  return route;
}

