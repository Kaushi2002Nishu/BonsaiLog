import React from 'react';
import { Pressable, StyleSheet, Platform } from 'react-native';

export default function HoverCard({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.baseCard,
        style,
        hovered && styles.hoveredCard,
        pressed && styles.pressedCard,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E3DCB9',
   
    ...Platform.select({
      web: {
        transitionProperty: 'transform, box-shadow, border-color',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-out',
        cursor: 'pointer',
      },
    }),
  },
  hoveredCard: {
    borderColor: '#3B7A57', 
    backgroundColor: '#FCFAF7',
    ...Platform.select({
      web: {
        transform: [{ translateY: -4 }, { scale: 1.01 }], 
        boxShadow: '0px 8px 16px rgba(44, 94, 67, 0.15)', 
      },
    }),
  },
  pressedCard: {
    transform: [{ scale: 0.98 }],
  },
});