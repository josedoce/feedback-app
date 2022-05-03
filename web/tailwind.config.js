module.exports = {
  //aqui dizemos quem o tailwind deve mapear, o padrão é arquivos html, e js
  //para o tailwind mapear tsx, será necessario configura-lo
  content: ["./src/**/*.tsx"],
  theme: {
    extend: { //aqui posso adicionar estilos ao tailwind
      colors: {
        brand: {
          300: "#996dff",
          500: "#8257e6"
        }
      },
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
