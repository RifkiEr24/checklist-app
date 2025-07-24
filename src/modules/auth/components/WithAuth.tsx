"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStores';
import { FullScreenLoader } from '@/common/components/FullScreenLoader';


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient && !isAuthenticated) {
        router.push('/login');
      }
    }, [isClient, isAuthenticated, router]);

    if (!isClient || !isAuthenticated) {
      return <FullScreenLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
