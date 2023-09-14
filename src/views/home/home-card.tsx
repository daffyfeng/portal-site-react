import http from '@/utils/http';
import { Avatar, Card } from 'antd';

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

  const url =
    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

  const title = (
    <div>
      <Avatar src={url} /> <span>龙江系统</span>
    </div>
  );

  return (
    <Card
      title={title}
      hoverable
      bordered={false}
      style={{ width: 300 }}
      onClick={onOpenSite}
    >
      <div>描述：龙江数字政府效能监察系统</div>
    </Card>
  );
}
