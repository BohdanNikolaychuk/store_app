import { Button, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { FiDelete } from 'react-icons/fi';
import { RiFileEditLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchDeleteSneaker } from '../../store/product/asyncActions';
import { ISneakers } from '../../store/product/types';
const TableProduct = ({ _id, name, price, category, image_url }: ISneakers) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{_id}</Td>
              <Td>{name}</Td>

              <Td>{category}</Td>
              <Td>{price}$</Td>
              <Td>
                <Button as={NavLink} to={ROUTES.EDITBYID(_id)}>
                  <RiFileEditLine />
                </Button>
                <Button onClick={() => dispatch(fetchDeleteSneaker(_id))}>
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

export default TableProduct;
