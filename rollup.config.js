import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import sizes from 'rollup-plugin-sizes'
import { minify } from 'uglify-es';

const name = 'GlslCanvas';
const input = 'src/GlslCanvas.js';
const plugins = [
    resolve({
        preferBuiltins: true, // Default: true (specify explicitly to disable warning)
    }),
    commonjs(),
    babel({
        exclude: 'node_modules/**', // only transpile our source code
        runtimeHelpers: true
    }),
    sizes()
];

const devConfigs = [
    {
        input,
        output: {
            name,
            file: `lib/${name}.js`,
            format: 'cjs'
        },
        plugins
    },
    {
        input,
        output: {
            file: `dist/${name}.es.js`,
            format: 'es'
        },
        plugins,
        external: ['xhr'],
    },
    {
        input,
        output: {
            name,
            file: `dist/${name}.js`,
            format: 'umd'
        },
        plugins
    },
]

const prodConfigs = [
    {
        input,
        output: {
            name,
            file: `dist/${name}.min.js`,
            format: 'umd'
        },
        plugins: [...plugins, uglify({}, minify)],
        sourcemap: true
    }
];

export default process.env.ROLLUP_WATCH ? devConfigs : devConfigs.concat(prodConfigs)
