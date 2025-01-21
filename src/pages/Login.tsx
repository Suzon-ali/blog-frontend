/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { setUser, useCurrentUser } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: 'admin@admin.com',
      password: 'securepassword',
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await login(userInfo).unwrap();
      const token = response?.data?.token;
      const user = verifyToken(token);
      dispatch(
        setUser({
          user,
          token,
        }),
      );
      toast.success('logged in')
      navigate('/admin/dashboard');
    } catch (err: any) {
      const message =
        err?.data?.message || err?.error || 'An unexpected error occurred';
      toast.error(message)
    }
  };

  const currentUser = useAppSelector(useCurrentUser);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-white">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input className="w-full px-4 py-2 mt-2 text-sm  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-700 text-white border-gray-600"
              type="email" id="email" placeholder="Enter your email"
              {...register('email')}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input className="w-full px-4 py-2 mt-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-700 text-white border-gray-600"
              type="password"
              id="password"
              {...register('password')}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
