import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface NavIconProps {
  focused: boolean;
  name: string;
}

const NavIcon: React.FC<NavIconProps> = ({ focused, name }) => {
  const color = focused ? '#484848' : '#909090';
  return <MaterialCommunityIcons name={name} size={32} color={color} />;
};

export default NavIcon;
