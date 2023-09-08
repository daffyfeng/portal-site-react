import http from '@/utils/http';
import { useEffect, useState } from 'react';
import HomeCard from './home/home-card';
import { JSX } from 'react/jsx-runtime';

export default function Home() {
  const list: JSX.Element[] = [];
  const [sites, setSites] = useState([]);
  const [listSite, setListSite] = useState(list);
  useEffect(() => {
    http.get('/home/index').then(({ data }) => {
      if (data.code == 200) {
        setSites(data.data);
      }
    });
  }, []);

  useEffect(() => {
    const listSite = sites.map((s) => <HomeCard api={s} key={s}></HomeCard>);
    setListSite(listSite);
  }, [sites]);

  return listSite;
}
