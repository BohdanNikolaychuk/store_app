import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue
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
const Register: React.FC = () => {
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
    <Container maxW="600px">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    {...register('username')}
                    placeholder="User Name"
                    type="text"
                    variant="filled"
                  />
                </FormControl>
              </Box>
              {errors.username?.message && (
                <Alert status="error">
                  <AlertIcon />

                  <AlertDescription>{errors.username?.message}</AlertDescription>
                </Alert>
              )}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register('email')}
                  placeholder="Email address"
                  type="email"
                  variant="filled"
                />
              </FormControl>
              {errors.email?.message && (
                <Alert status="error">
                  <AlertIcon />

                  <AlertDescription>{errors.email?.message}</AlertDescription>
                </Alert>
              )}
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password')}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="filled"
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {errors.password?.message && (
                <Alert status="error">
                  <AlertIcon />

                  <AlertDescription>{errors.password?.message}</AlertDescription>
                </Alert>
              )}
              <Stack pt={2}>
                <Button type="submit" colorScheme="teal" mb={8}>
                  Sign up
                </Button>
              </Stack>
              <Stack>
                <Text align={'center'}>
                  Already a user?{' '}
                  <NavLink to={ROUTES.LOGIN} color={'blue.400'}>
                    Sign in
                  </NavLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default Register;
