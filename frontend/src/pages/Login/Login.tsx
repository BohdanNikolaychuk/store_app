import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';

import { NavLink, useNavigate } from 'react-router-dom';
import ROUTES from '../../router/_routes';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ILogin } from '../../@types/IAuth.interface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { userLogin } from '../../store/user/asyncActions';
import { selectAuthData } from '../../store/user/selectors';

const Login = () => {
  const { isAuth } = useAppSelector(selectAuthData);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 7 characters')
      .max(40, 'Password must not exceed 40 characters')
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ILogin>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (UserData: ILogin) => {
    dispatch(userLogin(UserData));
  };
  if (isAuth) {
    navigate(ROUTES.MAIN);
  }
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <Heading mb={6}>Log In</Heading>

          <Input
            {...register('username')}
            placeholder="User Name"
            type="text"
            variant="filled"
            mb={3}
          />

          {errors.username?.message && (
            <Alert status="error">
              <AlertIcon />

              <AlertDescription>{errors.username?.message}</AlertDescription>
            </Alert>
          )}

          <Input
            {...register('password')}
            placeholder="******"
            type="password"
            autoComplete="on"
            variant="filled"
            autoCorrect="on"
            mb={6}
          />

          {errors.password?.message && (
            <Alert status="error">
              <AlertIcon />

              <AlertDescription>{errors.password?.message}</AlertDescription>
            </Alert>
          )}

          <Button disabled={!isValid} type="submit" colorScheme="teal" mb={8}>
            Log In
          </Button>

          <Text mb={6}>
            If you not have an account you can
            <Button as={NavLink} to="/register">
              Register
            </Button>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
