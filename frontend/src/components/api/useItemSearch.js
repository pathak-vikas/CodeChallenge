import axios from "axios";
import { useEffect, useState } from "react";

export default function useItemSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "/api/items/",
      params: {
        q: query,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setItems((prevBooks) => {
          const newData = [...prevBooks, ...res.data.map((b) => b)];
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
  }, [query, pageNumber]);

  return { loading, error, items, hasMore };
}
