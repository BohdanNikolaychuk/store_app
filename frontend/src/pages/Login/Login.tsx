import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import ROUTES from '../../router/_routes';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { ILogin } from '../../@types/IAuth.interface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { userLogin } from '../../store/user/asyncActions';
import { selectAuthData } from '../../store/user/selectors';

const Login: React.FC = () => {
  const { isAuth } = useAppSelector(selectAuthData);
  const [showPassword, setShowPassword] = useState(false);
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
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="4xl">
          LOGIN
        </Text>
      </Box>
      <Container maxW="600px">
        <Stack mt="40px" bg="#f7f7f7" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Login
              </Heading>
            </Stack>
            <Box rounded={'lg'} p={8}>
              <Stack spacing={4}>
                <Box>
                  <Input
                    placeholder="User Name"
                    type="text"
                    {...register('username')}
                    border="none"
                    rounded="none"
                    bg="white"
                  />
                </Box>
                {errors.username?.message && (
                  <Alert status="error">
                    <AlertIcon />

                    <AlertDescription>{errors.username?.message}</AlertDescription>
                  </Alert>
                )}

                <InputGroup>
                  <Input
                    {...register('password')}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    border="none"
                    rounded="none"
                    bg="white"
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {errors.password?.message && (
                  <Alert status="error">
                    <AlertIcon />

                    <AlertDescription>{errors.password?.message}</AlertDescription>
                  </Alert>
                )}
                <Stack pt={2}>
                  <Button
                    type="submit"
                    rounded="none"
                    _hover={{ background: 'gray' }}
                    bg="#333333"
                    mt="10"
                    p="6">
                    <Text color="white" textTransform="uppercase">
                      Log In
                    </Text>
                  </Button>
                </Stack>
                <Stack>
                  <Text align={'center'}>
                    New Customers?{'   '}
                    <NavLink to={ROUTES.REGISTER} color={'blue.400'}>
                      Create an account
                    </NavLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
