import { swc } from 'rollup-plugin-swc3';

export default {
  input: 'src/models/initialize.ts',
  output: {
    file: 'ios/initialize_db.js',
    format: 'cjs',
  },
  plugins: [
    swc({
      include: ['src/models/initialize.ts', 'src/models/schema/*'],
      jsc: {
        parser: {
          syntax: 'typescript',
        },
      },
    }),
  ],
  external: ['realm', 'react-native-uuid'],
};
