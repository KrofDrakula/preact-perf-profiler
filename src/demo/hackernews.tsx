import { FunctionComponent, FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

const chunk = function* <T>(list: Iterable<T>, count: number): Generator<T[]> {
  let buffer: T[] = [];
  for (const item of list) {
    buffer.push(item);
    if (buffer.length == count) {
      yield buffer;
      buffer = [];
    }
  }
  if (buffer.length > 0) yield buffer;
};

interface Props {
  maxStories: number;
}

interface HackernewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

const Hackernews: FunctionComponent<Props> = ({ maxStories }) => {
  const [error, setError] = useState<Error | null>(null);
  const [list, setList] = useState<HackernewsItem[] | null>(null);

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
      .then((response) => response.json())
      .then((ids) => chunk(ids.slice(0, maxStories), 5))
      .then(async (chunks) => {
        let data: HackernewsItem[] = [];
        for (const chunk of chunks) {
          data.push(
            ...(await Promise.all(
              chunk.map((id) =>
                fetch(
                  `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                ).then((response) => response.json())
              )
            ))
          );
        }
        setList(data);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (
      <div style="color:red">
        <pre>
          <code>{error.toString()}</code>
        </pre>
      </div>
    );
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style>{`
        .table {
          border-collapse: collapse;
        }
        .table :is(td, th) {
          border: 1px solid #ccc;
          padding: 2px 6px;
        }
      `}</style>
      <h1>Hackernews top stories</h1>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Created</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr>
                <th>{item.id}</th>
                <td>
                  {new Date(item.time).toDateString()} @{" "}
                  {new Date(item.time).toLocaleTimeString()}
                </td>
                <td>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </td>
                <td>
                  <a
                    href={`https://news.ycombinator.com/user?id=${item.by}`}
                    target="_blank"
                  >
                    {item.by}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Hackernews;
