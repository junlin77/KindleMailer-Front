import {
    Input,
    Stack,
  } from '@chakra-ui/react'

function SearchBar() {
    return (
        <form>
        <Stack spacing={3} direction="row" align="center">
            <Input variant="outline" type="text" placeholder="Title" />
            <Input variant="outline" type="text" placeholder="Author"/>
            <Input variant="outline" type="text" placeholder="Extension"/>
            <Input variant="outline" type="text" placeholder="Email"/>
        </Stack>
        </form>
    );
}

export default SearchBar;