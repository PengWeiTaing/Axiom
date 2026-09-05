// The upstream package has no bundled types. Keep this declaration to the API used here.
declare module 'd3-force-3d' {
  export interface SimulationNode { x?: number; y?: number; z?: number; }
  export interface Force { (alpha: number): void; }
  export interface Simulation {
    force(name: string, force: Force): this;
    stop(): this;
    tick(iterations: number): this;
  }
  export interface LinkForce<N, L> extends Force {
    id(accessor: (node: N) => string): this;
    distance(value: number | ((link: L) => number)): this;
    strength(value: number): this;
  }
  export interface ManyBodyForce extends Force { strength(value: number): this; }
  export function forceSimulation<N extends SimulationNode>(nodes: N[], dimensions: number): Simulation;
  export function forceLink<N, L>(links: L[]): LinkForce<N, L>;
  export function forceManyBody(): ManyBodyForce;
  export function forceCenter(x?: number, y?: number, z?: number): Force;
  export function forceCollide(radius: number): Force;
}
