import http from '@/utils/http';
import { Card } from 'antd';

export default function HomeCard({ api }: any) {
  function onOpenSite() {
    console.log(111);
    console.log(api);

    http
      .post(
        api,
        {},
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }
      )
      .then(({ data }) => {
        if (data.code == 200) {
          window.open(decodeURIComponent(data.data), '_blank');
        }
      });
  }

  return (
    <Card
      title='xxx系统'
      hoverable
      bordered={false}
      style={{ width: 300 }}
      onClick={onOpenSite}
    >
      <p>描述：1</p>
      <p>描述：2</p>
    </Card>
  );
}
