import { options, Options, ComponentType, VNode } from "preact";

type OptionsWithInternals = Options & {
  _diff?: (vnode: VNode) => void;
  __b: (vnode: VNode) => void;
};

// aliasing to provide internal options
const opts = options as OptionsWithInternals;
let id = 0;

const trackedComponents = new Set<ComponentType>();

const isTracking = (vnode: VNode) =>
  typeof vnode.type != "string" && trackedComponents.has(vnode.type);

const originals = { ...opts };

const marks: string[] = [];

opts._diff = opts.__b = (vnode) => {
  if (isTracking(vnode)) {
    marks.push(`component_${id++}`);
    performance.mark(marks.at(-1)!);
  }
  return originals._diff?.(vnode);
};

opts.diffed = (vnode) => {
  if (isTracking(vnode)) {
    const component = vnode.type as ComponentType;
    const startMark = marks.pop();
    if (startMark) {
      const endMark = `${startMark}_end`;
      performance.mark(endMark);
      performance.measure(
        `⚛️ ${component.displayName ?? component.name ?? "component"}`,
        startMark,
        endMark
      );
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
    } else if (import.meta.env.DEV) {
      console.error(`Cannot find start mark for `, vnode);
    }
  }
  originals.diffed?.(vnode);
};

export const track = <T extends ComponentType<any>>(component: T): void => {
  trackedComponents.add(component);
};

export const untrack = <T extends ComponentType<any>>(component: T): void => {
  trackedComponents.delete(component);
};
