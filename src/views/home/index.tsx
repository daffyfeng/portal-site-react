import { useEffect, useState } from 'react';

export default function Home() {
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          // 重定向到登录页
          setRedirectToLogin(true);
        }
      }, []);

    return (
        <div>
            <div>
                <span>xx系统</span>
            </div>
        </div>
    )
}