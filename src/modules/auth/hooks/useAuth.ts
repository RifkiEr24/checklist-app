import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login as loginService, register as registerService } from '../services';
import { LoginPayload, RegisterPayload } from '../types';
import { useAuthStore } from '../stores/authStores';

export const useAuth = () => {
  const router = useRouter();
  const { setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginService(payload),
    onSuccess: (response, payload) => { 
      toast.success('Login successful! Redirecting...');
      const token = response.data.data.token;
      console.log(response)
      setAuth({ username: payload.username }, token);
    },
    onError: (error) => {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerService(payload),
    onSuccess: (response) => {
        toast.success('Registration successful!', {
            description: 'Please log in with your new account.'
        });
        router.push('/login');
    },
    onError: (error: { response?: { data?: { errors?: string[] } } }) => {
        const errorMessage = error.response?.data?.errors?.[0] || 'Please check your details and try again.';
        toast.error('Registration failed', {
            description: errorMessage,
        });
    }
  });

  const logout = () => {
    clearAuth();
    toast.info("You have been logged out.");
    router.push('/login');
  };

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    logout,
  };
};
