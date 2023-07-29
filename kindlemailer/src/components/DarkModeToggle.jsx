import { useColorMode, IconButton } from '@chakra-ui/react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton className='dark-mode-toggle'
      icon={colorMode === 'dark' ? <BsSunFill /> : <BsMoonStarsFill />}
      onClick={toggleColorMode}
      aria-label="Toggle Dark Mode"
      variant = 'ghost'
    />
  );
};

export default DarkModeToggle;
