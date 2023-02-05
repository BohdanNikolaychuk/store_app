import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
    <Container maxW="600px">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input {...register('username')} type="text" />

                  {errors.username?.message && (
                    <Alert status="error">
                      <AlertIcon />

                      <AlertDescription>{errors.username?.message}</AlertDescription>
                    </Alert>
                  )}
                </FormControl>
              </Box>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input {...register('password')} type="password" />
                  <InputRightElement h={'full'}></InputRightElement>
                </InputGroup>
                {errors.password?.message && (
                  <Alert status="error">
                    <AlertIcon />

                    <AlertDescription>{errors.password?.message}</AlertDescription>
                  </Alert>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  disabled={!isValid}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500'
                  }}>
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Create account?
                <Button>
                  <NavLink to={ROUTES.REGISTER} color={'blue.400'}>
                    Register
                  </NavLink>
                </Button>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
