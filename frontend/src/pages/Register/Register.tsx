import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { IRegistration } from '../../@types/IAuth.interface';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { registerUser } from '../../store/user/asyncActions';
export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    email: Yup.string().email('Invalid email format').required('Mail is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 7 characters')
      .max(40, 'Password must not exceed 40 characters')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IRegistration>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (UserData: IRegistration) => {
    dispatch(registerUser(UserData));
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="4xl">
          Create New Customer Account
        </Text>
      </Box>
      <Container maxW="600px">
        <Stack mt="40px" bg="#f7f7f7" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box rounded={'lg'} p={8}>
              <Stack spacing={4}>
                <Box>
                  <Input
                    border="none"
                    rounded="none"
                    bg="white"
                    {...register('username')}
                    placeholder="User Name"
                    type="text"
                  />
                </Box>
                {errors.username?.message && (
                  <Alert status="error">
                    <AlertIcon />

                    <AlertDescription>{errors.username?.message}</AlertDescription>
                  </Alert>
                )}

                <Input
                  {...register('email')}
                  placeholder="Email address"
                  type="email"
                  border="none"
                  rounded="none"
                  bg="white"
                />

                {errors.email?.message && (
                  <Alert status="error">
                    <AlertIcon />

                    <AlertDescription>{errors.email?.message}</AlertDescription>
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
                      Create an Account
                    </Text>
                  </Button>
                </Stack>
                <Stack>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Text _hover={{ color: 'gray' }}>
                      <NavLink to={ROUTES.LOGIN} color={'blue.400'}>
                        Sign in
                      </NavLink>
                    </Text>
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
