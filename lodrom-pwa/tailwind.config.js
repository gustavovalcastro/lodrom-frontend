// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Caminho para todos os arquivos .js e .jsx na pasta src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Adiciona 'Poppins' como fonte principal
      },
    },
  },
  plugins: [],
};