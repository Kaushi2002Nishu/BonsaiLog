import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LeafWatermark() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      
      <Text style={[styles.leaf, styles.l1]}>🍃</Text>
      <Text style={[styles.leaf, styles.l3]}>🌿</Text>
      <Text style={[styles.leaf, styles.l5]}>🍂</Text>
      <Text style={[styles.leaf, styles.l7]}>🍃</Text>
      <Text style={[styles.leaf, styles.l9]}>🌱</Text>
      <Text style={[styles.leaf, styles.l11]}>🌿</Text>

      
      <Text style={[styles.leaf, styles.l2]}>🌿</Text>
      <Text style={[styles.leaf, styles.l4]}>🍃</Text>
      <Text style={[styles.leaf, styles.l6]}>🍂</Text>
      <Text style={[styles.leaf, styles.l8]}>🍃</Text>
      <Text style={[styles.leaf, styles.l10]}>🌱</Text>
      <Text style={[styles.leaf, styles.l12]}>🍃</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  leaf: {
    position: 'absolute',
    opacity: 0.4,
  },
  
  
  l1:  { top: '5%',  left: 25, fontSize: 42, transform: [{ rotate: '15deg'  }] },
  l3:  { top: '22%', left: 15, fontSize: 48, transform: [{ rotate: '25deg'  }] },
  l5:  { top: '40%', left: 30, fontSize: 36, transform: [{ rotate: '8deg'   }] },
  l7:  { top: '58%', left: 20, fontSize: 42, transform: [{ rotate: '-15deg' }] },
  l9:  { top: '75%', left: 35, fontSize: 48, transform: [{ rotate: '25deg'  }] },
  l11: { bottom: '4%', left: 25, fontSize: 32, transform: [{ rotate: '8deg' }] },

  l2:  { top: '10%', right: 30, fontSize: 36, transform: [{ rotate: '-20deg' }] },
  l4:  { top: '26%', right: 25, fontSize: 40, transform: [{ rotate: '-12deg' }] },
  l6:  { top: '43%', right: 40, fontSize: 34, transform: [{ rotate: '18deg'  }] },
  l8:  { top: '62%', right: 20, fontSize: 36, transform: [{ rotate: '20deg'  }] },
  l10: { top: '78%', right: 35, fontSize: 40, transform: [{ rotate: '-12deg' }] },
  l12: { bottom: '5%', right: 30, fontSize: 34, transform: [{ rotate: '18deg' }] },
});