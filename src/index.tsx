import React, { useMemo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

//@ts-ignore
import createPDF417 from './thirdparty/pdf417';

export type PDF417Props = ViewProps & {
  height: number;
  text: string;
  width: number;
  fillColor?: string;
};

function PDF417(props: PDF417Props) {
  const {
    text,
    width,
    height,
    fillColor = '#000000',
    style,
    ...restProps
  } = props;
  const shapes = useMemo(() => {
    const pdf417 = createPDF417();
    pdf417.init(text);

    const { bcode: barcode, num_cols, num_rows } = pdf417.getBarcodeArray();
    const h = height / num_rows;
    const w = width / num_cols;
    const result: string[] = [];
    barcode.forEach((line: string[], i: number) => {
      line.forEach((code: string, j: number) => {
        if (code === '1') {
          result.push(
            `M ${j * w} ${i * h} h ${w} v ${h} h -${w} L ${j * w} ${i * h} z`
          );
        }
      });
    });

    return result.join(' ');
  }, [height, text, width]);

  return (
    <View style={[styles.container, style]} {...restProps}>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <G x={0} y={0}>
          <Path d={shapes} fill={fillColor} />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
export default PDF417;
