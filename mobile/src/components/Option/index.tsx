import React from 'react';
import { 
  Text,
  View,
  Image,
  ImageProps, 
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

import { styles } from './styles';

export function Option({title, image, ...rest}:Props) {
  return (
    <TouchableOpacity 
      style={styles.container}
      {...rest}
    >
      <Image 
        source={image}
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}