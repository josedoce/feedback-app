module.exports = {
  //aqui dizemos quem o tailwind deve mapear, o padrão é arquivos html, e js
  //para o tailwind mapear tsx, será necessario configura-lo
  content: ["./src/**/*.tsx"],
  theme: {
    extend: { //aqui posso adicionar estilos ao tailwind
      colors: {
        brand: {
          500: "#8257e6"
        }
      }
    },
  },
  plugins: [],
}
