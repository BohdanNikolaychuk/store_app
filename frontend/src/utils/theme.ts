import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          rounded: 'none',
          bg: '#333333',
          color: 'white',
          _hover: { background: 'gray' },
          textTransform: 'uppercase'
        }
      }
    },
    Input: {
      variants: {
        primary: {
          field: {
            rounded: 'none',
            bg: '#f7f7f7'
          }
        }
      }
    },
    Select: {
      variants: {
        primary: {
          field: {
            rounded: 'none',
            bg: '#f7f7f7'
          }
        }
      }
    },
    Textarea: {
      variants: {
        primary: {
          rounded: 'none',
          bg: '#f7f7f7'
        }
      }
    }
  }
});
