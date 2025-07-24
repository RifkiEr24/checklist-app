"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStores';
import { FullScreenLoader } from '@/common/components/FullScreenLoader';


const withGuest = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const GuestComponent = (props: P) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient && isAuthenticated) {
        router.push('/');
      }
    }, [isClient, isAuthenticated, router, user]);

    if (isClient && isAuthenticated) {
      return <FullScreenLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  GuestComponent.displayName = `withGuest(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return GuestComponent;
};

export default withGuest;