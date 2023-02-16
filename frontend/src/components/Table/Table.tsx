import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { ISneakers } from '../../store/product/types';

const TableProduct = ({ _id, name, price, category, image_url }: ISneakers) => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>{_id}</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableProduct;
