export default () => (
  <>
    <h1>
      <code>preact-perf-profiler</code> demo
    </h1>
    <p>
      <a
        href="https://github.com/krofdrakula/preact-perf-profiler"
        target="_blank"
      >
        github.com/krofdrakula/preact-perf-profiler
      </a>
    </p>
    <p>
      This demo loads top stories from{" "}
      <a href="https://news.ycombinator.com/" target="_blank">
        Hackernews
      </a>{" "}
      and renders a table. It tracks this component's rendering performance by
      injecting <code>performance.mark()</code> and{" "}
      <code>performance.measure()</code> calls during component rendering to
      mark locations on the Dev Tools timeline.
    </p>
    <p>
      To see how the table component performs on this page, record a timeline in
      the Performance tab in Dev Tools and you should be able to see timings in
      the User Timings section.
    </p>
  </>
);
