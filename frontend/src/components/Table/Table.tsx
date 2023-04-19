import { Button, Table, TableContainer, Tbody, Td, Tr, Hide } from '@chakra-ui/react';
import { FiDelete } from 'react-icons/fi';
import { RiFileEditLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchDeleteSneaker } from '../../store/product/asyncActions';
import { ISneakers } from '../../store/product/types';

export const TableProduct = ({ _id, name, price, category }: ISneakers) => {
  const dispatch = useAppDispatch();

  const onDeletedProduct = (id: string) => {
    dispatch(fetchDeleteSneaker(id));
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{_id}</Td>
              <Td>{name}</Td>
              <Hide below="xl">
                <Td>{category}</Td>
                <Td>{price}$</Td>
              </Hide>
              <Td>
                <Button as={NavLink} to={ROUTES.EDITBYID(_id)}>
                  <RiFileEditLine />
                </Button>
                <Button onClick={() => onDeletedProduct(_id)}>
                  <FiDelete />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
