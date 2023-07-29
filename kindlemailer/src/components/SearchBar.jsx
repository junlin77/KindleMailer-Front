import {
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
  } from '@chakra-ui/react'

import { BiBook } from 'react-icons/bi';
import { AiOutlineUser, AiOutlineFile, AiOutlineMail } from 'react-icons/ai';
import '../styles/SearchBar.css';

function SearchBar() {
    return (
        <FormControl className='form'>
        <Stack spacing={3} direction="row" align="center">
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <BiBook />
                </InputLeftElement>
                <Input variant="outline" type="text" placeholder="Title" />
            </InputGroup>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <AiOutlineUser />
                </InputLeftElement>
                <Input variant="outline" type="text" placeholder="Author"/>
            </InputGroup>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <AiOutlineFile />
                </InputLeftElement>
                <Input variant="outline" type="text" placeholder="Extension"/>
            </InputGroup>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <AiOutlineMail />
                </InputLeftElement>
                <Input variant="outline" type="text" placeholder="Email"/>
            </InputGroup>
        </Stack>
        </FormControl>
    );
}

export default SearchBar;