import { useEffect, useState } from 'react';
import { getShopOrdersTopicFallbackMeta } from '../config/shopOrdersTopic';

export function useShopOrdersTopicMeta() {
  const [meta, setMeta] = useState(getShopOrdersTopicFallbackMeta);

  useEffect(() => {
    let cancelled = false;

    fetch('./data/shop-orders-topic.json')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.lastPageUrl) {
          setMeta(data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return meta;
}
