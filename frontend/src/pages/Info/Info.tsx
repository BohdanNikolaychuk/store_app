import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

const Info = () => {
  const [Store, setStore] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <>
      <Card {...Store}></Card>
      <Button as={Link} to={ROUTES.MAIN}>
        Go to Main
      </Button>
    </>
  );
};

export default Info;
