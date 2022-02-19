import axios from "axios";
import { useEffect, useState } from "react";

export default function useOrderSearch(query, pageNumber, queryType) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [query, queryType]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "/api/recent/",
      params: {
        q: query,
        page: pageNumber,
        queryType,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setItems((prevItems) => {
          const newData = [...prevItems, ...res.data.map((b) => b)];
          return newData.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
        });
        setHasMore(res.data.length > 0);
        if (res.data.length === 0) {
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, queryType]);

  return { loading, error, items, hasMore };
}
