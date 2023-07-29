// import { useColorMode, Switch } from '@chakra-ui/react';
// import { FaSun, FaMoon } from 'react-icons/fa';

// const DarkModeToggle = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
//   );
// };

// export default DarkModeToggle;
// DarkModeToggle.js

import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'dark' ? <BsSunFill /> : <BsMoonStarsFill />}
      onClick={toggleColorMode}
      aria-label="Toggle Dark Mode"
    />
  );
};

export default DarkModeToggle;
