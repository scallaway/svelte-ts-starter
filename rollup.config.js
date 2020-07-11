import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import autoPreprocess from "svelte-preprocess";
import autoPrefixer from 'autoprefixer';

export default {
  input: "index.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "app",
  },
  plugins: [
    typescript(),
    svelte({
      preprocess: autoPreprocess({
        defaults: {
          style: "scss",
        },
        postcss: {
          plugins: [autoPrefixer],
        },
      }),
      emitCss: true,
    }),
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
    }),
    commonjs(),
    serve(),
    livereload({ port: 5000 }),
    postcss({
      extract: true,
      minimisze: true,
      use: [
        [
          "sass",
          {
            includePaths: ["./node_modules"],
          },
        ],
      ],
    }),
  ],
  watch: {
    clearScreen: false,
  },
};
